import { NormalizedLandmarkList } from '@mediapipe/hands';

export class Hand2SoundProcessor {
  private onSoundParamsUpdated: (params: {
    frequency: number;
    volume: number;
  }) => void;

  constructor(
    onSoundParamsUpdated: (params: {
      frequency: number;
      volume: number;
    }) => void
  ) {
    this.onSoundParamsUpdated = onSoundParamsUpdated;
  }

  processLandmarks(landmarks: NormalizedLandmarkList | null) {
    if (!landmarks) {
      this.onSoundParamsUpdated({ frequency: 0, volume: 0 });
      return;
    }

    const x = landmarks[9].x;
    const y = landmarks[9].y;
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];

    const distance = Math.sqrt(
      Math.pow(thumbTip.x - indexTip.x, 2) +
        Math.pow(thumbTip.y - indexTip.y, 2)
    );

    const isHandClosed = distance < 0.1;
    const frequency = 300 + (1 - x) * 1700; // 300Hz ～ 2000Hz
    const volume = isHandClosed ? 1 - y : 0;

    this.onSoundParamsUpdated({ frequency, volume });
  }
}
