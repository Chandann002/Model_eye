const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;
const TARGET_EYE_Y = 0.15 * CANVAS_HEIGHT;

export function computeTransform(img, landmarks) {
  const eyeY =
    (landmarks.leftEye.y + landmarks.rightEye.y) / 2;

  const feetY = landmarks.feet.y;

  // Initial scale (align eyes)
  let scale = TARGET_EYE_Y / eyeY;

  // Prevent feet cutoff
  if (feetY * scale > CANVAS_HEIGHT) {
    scale = CANVAS_HEIGHT / feetY;
  }

  const offsetY = TARGET_EYE_Y - eyeY * scale;
  const offsetX = (CANVAS_WIDTH - img.width * scale) / 2;

  return { scale, offsetX, offsetY };
}