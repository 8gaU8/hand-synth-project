export class AudioController {
  private audioCtx: AudioContext | null = null;
  private melodyOsc: OscillatorNode | null = null;
  private melodyGain: GainNode | null = null;

  start() {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();

      this.melodyOsc = this.audioCtx.createOscillator();
      this.melodyGain = this.audioCtx.createGain();
      this.melodyOsc.type = 'sine';
      this.melodyOsc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      this.melodyGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.melodyOsc
        .connect(this.melodyGain)
        .connect(this.audioCtx.destination);
      this.melodyOsc.start();
    }
  }

  updateSound({ frequency, volume }: { frequency: number; volume: number }) {
    if (this.melodyOsc && this.melodyGain) {
      this.melodyOsc.frequency.setValueAtTime(
        frequency,
        this.audioCtx!.currentTime
      );
      this.melodyGain.gain.setValueAtTime(volume, this.audioCtx!.currentTime);
    }
  }
}
