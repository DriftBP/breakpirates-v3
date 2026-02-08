import { ComponentFixture, TestBed } from '@angular/core/testing';

import Drum808Component from './808.component';

describe('Drum808Component', () => {
  let component: Drum808Component;
  let fixture: ComponentFixture<Drum808Component>;

  beforeAll(() => {
    globalThis.fetch = vi.fn(() => Promise.resolve({
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8))
    })) as any;

    class MockAudioBuffer {}
    class MockAudioBufferSourceNode {
      buffer: any;
      connect() {}
      start() {}
    }
    class MockAudioContext {
      public currentTime = 0;
      public state = 'running';
      createBufferSource() { return new MockAudioBufferSourceNode(); }
      decodeAudioData() { return Promise.resolve(new MockAudioBuffer()); }
      resume() { return Promise.resolve(); }
      get destination() { return {}; }
    }
    (globalThis as any).AudioContext = MockAudioContext;
    (globalThis as any).webkitAudioContext = MockAudioContext;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drum808Component]
    }).compileComponents();
    fixture = TestBed.createComponent(Drum808Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
