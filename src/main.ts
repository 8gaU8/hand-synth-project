import { NormalizedLandmarkList } from '@mediapipe/hands';
import { AudioController } from './audio';
import { CameraController } from './camera';
import { Hand2SoundProcessor } from './hand2sound';

const audioController = new AudioController();
const updateSound = (soundParams: { frequency: number; volume: number }) => {
  audioController.updateSound(soundParams);
};

const hand2soundProcessor = new Hand2SoundProcessor(updateSound);

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;

const processLandmarks = (landmarks: NormalizedLandmarkList | null) => {
  hand2soundProcessor.processLandmarks(landmarks);
};

const cameraController = new CameraController(canvasElement, processLandmarks);

cameraController.start();

document.getElementById('startButton')!.addEventListener('click', () => {
  audioController.start();
});
