import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';

let model;

export async function loadModel() {
  model = await faceLandmarksDetection.createDetector(
    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
    {
      runtime: 'tfjs',
    }
  );
}

export async function detectLandmarks(img) {
  const faces = await model.estimateFaces(img);

  if (!faces.length) return null;

  const face = faces[0];

  const leftEye = face.keypoints.find(p => p.name === "leftEye");
  const rightEye = face.keypoints.find(p => p.name === "rightEye");

  if (!leftEye || !rightEye) return null;

  return {
    leftEye: { x: leftEye.x, y: leftEye.y },
    rightEye: { x: rightEye.x, y: rightEye.y },
    feet: { x: img.width / 2, y: img.height }
  };
}