import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import {
  HAND_CONNECTIONS,
  Hands,
  NormalizedLandmarkList,
  Results,
} from '@mediapipe/hands';

export class CameraController {
  private canvas: HTMLCanvasElement;
  private canvasCtx: CanvasRenderingContext2D;
  private hands: Hands;
  private camera: Camera;
  private onLandmarksDetected: (
    landmarks: NormalizedLandmarkList | null
  ) => void;

  constructor(
    canvas: HTMLCanvasElement,
    processLandmarks: (landmarks: NormalizedLandmarkList | null) => void
  ) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d')!;
    this.onLandmarksDetected = processLandmarks;

    this.hands = new Hands({
      locateFile: (file: unknown) => `/hand_models/${file}`,
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.hands.onResults((results: Results) => this.processResults(results));

    const videoElement = document.createElement('video');
    videoElement.width = 640;
    videoElement.height = 480;
    videoElement.style.display = 'none';

    this.camera = new Camera(videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: videoElement });
      },
      width: 640,
      height: 480,
    });

    this.camera.start();
  }

  private processResults(results: Results) {
    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.translate(this.canvas.width, 0);
    this.canvasCtx.scale(-1, 1);

    if (results.image) {
      this.canvasCtx.drawImage(
        results.image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }

    if (results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 2,
      });
      drawLandmarks(this.canvasCtx, landmarks, { color: '#FF0000', radius: 4 });

      this.onLandmarksDetected(landmarks);
    } else {
      this.onLandmarksDetected(null);
    }

    this.canvasCtx.restore();
  }

  public start() {
    this.camera.start();
  }
}
