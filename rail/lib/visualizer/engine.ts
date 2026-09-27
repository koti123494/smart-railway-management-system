import { VisualizerStep } from '../dsa-data';

export interface VisualizerPlaybackState {
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; // 500ms, 1000ms, 1500ms
  totalSteps: number;
}

export class VisualizerController {
  private steps: VisualizerStep[];
  private currentStepIndex: number;
  private isPlaying: boolean;
  private timer: any | null;
  private speedMs: number;
  private onStateChange: (state: VisualizerPlaybackState, currentStep: VisualizerStep) => void;

  constructor(
    steps: VisualizerStep[],
    onStateChange: (state: VisualizerPlaybackState, currentStep: VisualizerStep) => void
  ) {
    this.steps = steps || [];
    this.currentStepIndex = 0;
    this.isPlaying = false;
    this.timer = null;
    this.speedMs = 1200;
    this.onStateChange = onStateChange;

    this.notify();
  }

  public getCurrentStep(): VisualizerStep | null {
    if (this.steps.length === 0) return null;
    return this.steps[this.currentStepIndex];
  }

  public nextStep(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.notify();
    } else {
      this.pause();
    }
  }

  public previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.notify();
    }
  }

  public restart(): void {
    this.pause();
    this.currentStepIndex = 0;
    this.notify();
  }

  public setStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentStepIndex = index;
      this.notify();
    }
  }

  public play(): void {
    if (this.isPlaying) return;
    if (this.currentStepIndex >= this.steps.length - 1) {
      this.currentStepIndex = 0;
    }
    this.isPlaying = true;
    this.notify();

    this.timer = setInterval(() => {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
        this.notify();
      } else {
        this.pause();
      }
    }, this.speedMs);
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.notify();
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setSpeed(multiplier: number): void {
    // 0.5x -> 2000ms, 1x -> 1200ms, 2x -> 600ms
    this.speedMs = Math.round(1200 / multiplier);
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  public destroy(): void {
    this.pause();
  }

  private notify(): void {
    if (this.onStateChange && this.steps.length > 0) {
      this.onStateChange(
        {
          currentStepIndex: this.currentStepIndex,
          isPlaying: this.isPlaying,
          playbackSpeed: this.speedMs,
          totalSteps: this.steps.length
        },
        this.steps[this.currentStepIndex]
      );
    }
  }
}

