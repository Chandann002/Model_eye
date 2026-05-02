import { loadModel, detectLandmarks } from './processor/detect.js';
import { computeTransform } from './processor/transform.js';
import { renderToCanvas } from './processor/render.js';

window.addEventListener('DOMContentLoaded', async () => {
  console.log("DOM loaded");

  const input = document.getElementById('fileInput');
  const canvas = document.getElementById('canvas');

  console.log("Input:", input);

  await loadModel();
  console.log("Model loaded");

  input.addEventListener('change', async (e) => {
    console.log("File selected");

    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      console.log("Image loaded");

      const landmarks = await detectLandmarks(img);
      console.log("Landmarks:", landmarks);

      if (!landmarks) {
        alert("Face not detected");
        return;
      }

      const transform = computeTransform(img, landmarks);
      console.log("Transform:", transform);

      renderToCanvas(canvas, img, transform, landmarks);
      console.log("Rendered");
    };
  });
});


//document.querySelectorAll('#fileInput')