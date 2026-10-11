import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

interface MpcPad {
  key: string;
  name: string;
  sampleName: string | null;
  buffer: AudioBuffer | null;
  mode: 'oneshot' | 'loop';
  bars: number;
}

@Component({
  selector: 'bp-mpc',
  templateUrl: './mpc.component.html',
  styleUrl: './mpc.component.scss',
  imports: [CommonModule, FormsModule]
})
export default class MpcComponent implements OnDestroy {
  readonly pads: MpcPad[] = ['1', '2', '3', '4', 'q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v']
    .map((key, index) => ({
      key,
      name: `Pad ${String(index + 1).padStart(2, '0')}`,
      sampleName: null,
      buffer: null,
      mode: 'oneshot' as const,
      bars: 1
    }));

  tempo = 120;
  quantizeDivisions = 4;
  selectedPadIndex = 0;
  activePadIndex: number | null = null;
  loadMessage = '';

  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly breadcrumbConfig: BreadcrumbConfigItem[] = [toolsConfigInactive];
  private audioContext: AudioContext | null = null;
  private readonly voices: (AudioBufferSourceNode | null)[] = Array(16).fill(null);
  private readonly activeTimers = new Map<number, number>();
  private lastTapAt = 0;

  constructor() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  get selectedPad(): MpcPad {
    return this.pads[this.selectedPadIndex];
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]')) return;

    const padIndex = this.pads.findIndex(pad => pad.key === event.key.toLowerCase());
    if (padIndex < 0) return;

    event.preventDefault();
    void this.triggerPad(padIndex);
  }

  async loadFiles(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    let loaded = 0;

    for (const file of files) {
      const padIndex = this.pads.findIndex(pad => !pad.sampleName);
      if (padIndex < 0) break;
      try {
        await this.assignSample(padIndex, file);
        loaded++;
      } catch {
        this.loadMessage = `Could not load ${file.name}. Try a supported audio file.`;
      }
    }

    if (loaded > 0) this.loadMessage = `${loaded} sample${loaded === 1 ? '' : 's'} loaded.`;
    if (loaded < files.length && this.pads.every(pad => pad.sampleName)) {
      this.loadMessage = `${loaded} sample${loaded === 1 ? '' : 's'} loaded. All 16 pads are full.`;
    }
    this.changeDetector.markForCheck();
  }

  async replaceSelectedSample(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    try {
      await this.assignSample(this.selectedPadIndex, file);
      this.loadMessage = `${this.selectedPad.name} loaded.`;
    } catch {
      this.loadMessage = `Could not load ${file.name}. Try a supported audio file.`;
    }
    this.changeDetector.markForCheck();
  }

  async dropSamples(event: DragEvent): Promise<void> {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files ?? []);
    let loaded = 0;

    for (const file of files) {
      const padIndex = this.pads.findIndex(pad => !pad.sampleName);
      if (padIndex < 0) break;
      try {
        await this.assignSample(padIndex, file);
        loaded++;
      } catch {
        this.loadMessage = `Could not load ${file.name}. Try a supported audio file.`;
      }
    }

    if (loaded > 0) this.loadMessage = `${loaded} sample${loaded === 1 ? '' : 's'} loaded.`;
    this.changeDetector.markForCheck();
  }

  async triggerPad(index: number): Promise<void> {
    const pad = this.pads[index];
    this.selectedPadIndex = index;
    if (!pad.buffer) return;

    const context = this.getAudioContext();
    if (context.state === 'suspended') await context.resume();
    this.stopVoice(index);

    const source = context.createBufferSource();
    source.buffer = pad.buffer;
    source.loop = pad.mode === 'loop';
    source.playbackRate.value = this.playbackRateFor(pad);
    source.connect(context.destination);
    this.voices[index] = source;
    source.onended = () => {
      if (this.voices[index] === source) this.voices[index] = null;
    };
    const startTime = this.quantizedStartTime(context.currentTime);
    source.start(startTime);

    this.activePadIndex = index;
    const oldTimer = this.activeTimers.get(index);
    if (oldTimer !== undefined) window.clearTimeout(oldTimer);
    this.activeTimers.set(index, window.setTimeout(() => {
      if (this.activePadIndex === index) this.activePadIndex = null;
      this.activeTimers.delete(index);
    }, Math.max(140, (startTime - context.currentTime) * 1000 + 140)));
  }

  updateTempo(value: number | string): void {
    const nextTempo = Number(value);
    if (!Number.isFinite(nextTempo)) return;
    this.tempo = Math.min(200, Math.max(40, Math.round(nextTempo)));

    this.pads.forEach((pad, index) => {
      const voice = this.voices[index];
      if (voice && pad.mode === 'loop') voice.playbackRate.setTargetAtTime(this.playbackRateFor(pad), this.audioContext!.currentTime, 0.03);
    });
  }

  updateQuantizeGrid(value: number | string): void {
    const divisions = Number(value);
    if ([1, 2, 4, 8].includes(divisions)) this.quantizeDivisions = divisions;
  }

  stopAll(): void {
    this.voices.forEach((_, index) => this.stopVoice(index));
    this.activeTimers.forEach(timer => window.clearTimeout(timer));
    this.activeTimers.clear();
    this.activePadIndex = null;
  }

  setPadMode(mode: 'oneshot' | 'loop'): void {
    this.selectedPad.mode = mode;
    this.stopVoice(this.selectedPadIndex);
  }

  updateBars(value: number | string): void {
    this.selectedPad.bars = Number(value);
    this.stopVoice(this.selectedPadIndex);
  }

  clearSelectedPad(): void {
    this.stopVoice(this.selectedPadIndex);
    this.selectedPad.buffer = null;
    this.selectedPad.sampleName = null;
    this.loadMessage = `${this.selectedPad.name} cleared.`;
  }

  tapTempo(): void {
    const now = performance.now();
    if (this.lastTapAt && now - this.lastTapAt < 2000) {
      this.updateTempo(60000 / (now - this.lastTapAt));
    }
    this.lastTapAt = now;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  ngOnDestroy(): void {
    this.stopAll();
    void this.audioContext?.close();
  }

  private async assignSample(index: number, file: File): Promise<void> {
    const context = this.getAudioContext();
    const data = await file.arrayBuffer();
    const buffer = await context.decodeAudioData(data);
    const pad = this.pads[index];
    this.stopVoice(index);
    pad.buffer = buffer;
    pad.sampleName = file.name.replace(/\.[^.]+$/, '');
    this.changeDetector.markForCheck();
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioContextConstructor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) throw new Error('Web Audio is not supported in this browser.');
      this.audioContext = new AudioContextConstructor();
    }
    return this.audioContext;
  }

  private playbackRateFor(pad: MpcPad): number {
    if (pad.mode !== 'loop' || !pad.buffer) return 1;
    return pad.buffer.duration / (pad.bars * 4 * 60 / this.tempo);
  }

  private quantizedStartTime(currentTime: number): number {
    const gridSeconds = 60 / this.tempo / this.quantizeDivisions;
    return Math.ceil(currentTime / gridSeconds - 1e-7) * gridSeconds;
  }

  private stopVoice(index: number): void {
    const voice = this.voices[index];
    if (!voice) return;
    voice.onended = null;
    voice.stop();
    this.voices[index] = null;
  }
}
