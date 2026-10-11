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

interface SavedMpcState {
  tempo: number;
  quantizeDivisions: number;
  sixteenLevels: boolean;
  levelSourcePadIndex: number | null;
  selectedPadIndex: number;
  pads: { mode: MpcPad['mode']; bars: number }[];
}

interface SavedMpcSample {
  index: number;
  name: string;
  data: ArrayBuffer;
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
  sixteenLevels = false;
  levelSourcePadIndex: number | null = null;
  selectedPadIndex = 0;
  activePadIndex: number | null = null;
  loadMessage = '';

  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly breadcrumbConfig: BreadcrumbConfigItem[] = [toolsConfigInactive];
  private readonly storageKey = 'breakpirates-mpc-state';
  private readonly restorePromise: Promise<void>;
  private audioContext: AudioContext | null = null;
  private readonly loopVoices: (AudioBufferSourceNode | null)[] = Array(16).fill(null);
  private readonly oneShotVoices: (AudioBufferSourceNode | null)[] = Array(16).fill(null);
  private readonly activeTimers = new Map<number, number>();
  private lastTapAt = 0;

  constructor() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
    this.restorePromise = this.restoreState();
  }

  get selectedPad(): MpcPad {
    return this.pads[this.selectedPadIndex];
  }

  get levelSourcePad(): MpcPad | null {
    return this.levelSourcePadIndex === null ? null : this.pads[this.levelSourcePadIndex];
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
    await this.restorePromise;
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
    await this.restorePromise;
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
    await this.restorePromise;
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
    await this.restorePromise;
    const pad = this.pads[index];
    this.selectedPadIndex = index;
    this.saveState();
    const sample = this.sixteenLevels ? this.levelSourcePad : pad;
    if (!sample?.buffer) return;

    const context = this.getAudioContext();
    if (context.state === 'suspended') await context.resume();
    const isLoop = !this.sixteenLevels && pad.mode === 'loop';
    const voiceGroup = isLoop ? this.loopVoices : this.oneShotVoices;
    this.stopTrackedVoice(voiceGroup, index);

    const source = context.createBufferSource();
    source.buffer = sample.buffer;
    source.loop = isLoop;
    source.playbackRate.value = this.sixteenLevels ? this.pitchRateForPad(index) : this.playbackRateFor(pad);
    source.connect(context.destination);
    voiceGroup[index] = source;
    source.onended = () => {
      if (voiceGroup[index] === source) voiceGroup[index] = null;
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
    this.saveState();

    this.pads.forEach((pad, index) => {
      const voice = this.loopVoices[index];
      if (voice && pad.mode === 'loop' && !this.sixteenLevels) voice.playbackRate.setTargetAtTime(this.playbackRateFor(pad), this.audioContext!.currentTime, 0.03);
    });
  }

  updateQuantizeGrid(value: number | string): void {
    const divisions = Number(value);
    if ([1, 2, 4, 8].includes(divisions)) {
      this.quantizeDivisions = divisions;
      this.saveState();
    }
  }

  toggleSixteenLevels(): void {
    if (this.sixteenLevels) {
      this.sixteenLevels = false;
      this.levelSourcePadIndex = null;
      this.saveState();
      return;
    }

    if (!this.selectedPad.buffer || this.selectedPad.mode === 'loop') return;
    this.levelSourcePadIndex = this.selectedPadIndex;
    this.sixteenLevels = true;
    this.saveState();
  }

  pitchRateForPad(index: number): number {
    if (this.levelSourcePadIndex === null) return 1;
    return Math.pow(2, (index - this.levelSourcePadIndex) / 12);
  }

  stopAll(): void {
    this.pads.forEach((_, index) => this.stopVoice(index));
    this.activeTimers.forEach(timer => window.clearTimeout(timer));
    this.activeTimers.clear();
    this.activePadIndex = null;
  }

  setPadMode(mode: 'oneshot' | 'loop'): void {
    this.selectedPad.mode = mode;
    this.stopVoice(this.selectedPadIndex);
    this.saveState();
  }

  updateBars(value: number | string): void {
    this.selectedPad.bars = Number(value);
    this.stopVoice(this.selectedPadIndex);
    this.saveState();
  }

  async clearSelectedPad(): Promise<void> {
    this.stopVoice(this.selectedPadIndex);
    try {
      await this.writeSample(this.selectedPadIndex, undefined);
    } catch {
      this.loadMessage = 'Could not remove the saved sample from this browser.';
    }
    this.selectedPad.buffer = null;
    this.selectedPad.sampleName = null;
    if (this.sixteenLevels && this.levelSourcePadIndex === this.selectedPadIndex) {
      this.sixteenLevels = false;
      this.levelSourcePadIndex = null;
    }
    this.loadMessage = `${this.selectedPad.name} cleared.`;
    this.saveState();
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
    const savedData = data.slice(0);
    const buffer = await context.decodeAudioData(data);
    const pad = this.pads[index];
    this.stopVoice(index);
    pad.buffer = buffer;
    pad.sampleName = file.name.replace(/\.[^.]+$/, '');
    try {
      await this.writeSample(index, { index, name: file.name, data: savedData });
      this.loadMessage = 'Sample saved in this browser.';
    } catch {
      this.loadMessage = 'Sample loaded, but could not be saved in this browser.';
    }
    this.saveState();
    this.changeDetector.markForCheck();
  }

  private async restoreState(): Promise<void> {
    let savedState: SavedMpcState | null = null;
    try {
      const serializedState = localStorage.getItem(this.storageKey);
      if (serializedState) savedState = JSON.parse(serializedState) as SavedMpcState;
    } catch {
      this.loadMessage = 'Saved sampler settings could not be read.';
    }

    if (savedState) {
      if (Number.isFinite(savedState.tempo)) this.tempo = Math.min(200, Math.max(40, Math.round(savedState.tempo)));
      if ([1, 2, 4, 8].includes(savedState.quantizeDivisions)) this.quantizeDivisions = savedState.quantizeDivisions;
      this.selectedPadIndex = this.validPadIndex(savedState.selectedPadIndex) ? savedState.selectedPadIndex : 0;
      if (Array.isArray(savedState.pads)) {
        savedState.pads.forEach((savedPad, index) => {
          if (!this.pads[index]) return;
          if (savedPad.mode === 'oneshot' || savedPad.mode === 'loop') this.pads[index].mode = savedPad.mode;
          if ([1, 2, 4, 8].includes(savedPad.bars)) this.pads[index].bars = savedPad.bars;
        });
      }
    }

    try {
      const samples = await this.readSamples();
      if (samples.length) {
        const context = this.getAudioContext();
        await Promise.all(samples.map(async sample => {
          if (!this.validPadIndex(sample.index)) return;
          try {
            this.pads[sample.index].buffer = await context.decodeAudioData(sample.data.slice(0));
            this.pads[sample.index].sampleName = sample.name.replace(/\.[^.]+$/, '');
          } catch {
            await this.writeSample(sample.index, undefined);
          }
        }));
      }
      const rootIndex = savedState?.levelSourcePadIndex;
      this.levelSourcePadIndex = savedState?.sixteenLevels && this.validPadIndex(rootIndex) && this.pads[rootIndex].buffer && this.pads[rootIndex].mode === 'oneshot'
        ? rootIndex
        : null;
      this.sixteenLevels = this.levelSourcePadIndex !== null;
      if (samples.length) this.loadMessage = 'Saved sampler state restored.';
    } catch {
      this.loadMessage = 'Saved samples could not be restored from this browser.';
    }

    this.changeDetector.markForCheck();
  }

  private saveState(): void {
    const state: SavedMpcState = {
      tempo: this.tempo,
      quantizeDivisions: this.quantizeDivisions,
      sixteenLevels: this.sixteenLevels,
      levelSourcePadIndex: this.levelSourcePadIndex,
      selectedPadIndex: this.selectedPadIndex,
      pads: this.pads.map(pad => ({ mode: pad.mode, bars: pad.bars }))
    };

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch {
      this.loadMessage = 'Sampler settings could not be saved in this browser.';
    }
  }

  private async openSampleDatabase(): Promise<IDBDatabase> {
    if (typeof indexedDB === 'undefined') throw new Error('IndexedDB is unavailable.');
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('breakpirates-mpc-samples', 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains('samples')) request.result.createObjectStore('samples', { keyPath: 'index' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async readSamples(): Promise<SavedMpcSample[]> {
    return this.withSampleStore('readonly', store => store.getAll() as IDBRequest<SavedMpcSample[]>);
  }

  private async writeSample(index: number, sample: SavedMpcSample | undefined): Promise<void> {
    if (sample) {
      await this.withSampleStore('readwrite', store => store.put(sample));
    } else {
      await this.withSampleStore<undefined>('readwrite', store => store.delete(index));
    }
  }

  private async withSampleStore<T>(mode: IDBTransactionMode, requestFor: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
    const database = await this.openSampleDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('samples', mode);
      const request = requestFor(transaction.objectStore('samples'));
      transaction.oncomplete = () => resolve(request.result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
      request.onerror = () => reject(request.error);
    });
  }

  private validPadIndex(index: unknown): index is number {
    return typeof index === 'number' && Number.isInteger(index) && index >= 0 && index < this.pads.length;
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
    this.stopTrackedVoice(this.loopVoices, index);
    this.stopTrackedVoice(this.oneShotVoices, index);
  }

  private stopTrackedVoice(voices: (AudioBufferSourceNode | null)[], index: number): void {
    const voice = voices[index];
    if (!voice) return;
    voice.onended = null;
    voice.stop();
    voices[index] = null;
  }
}
