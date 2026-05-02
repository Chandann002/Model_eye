export function renderToCanvas(canvas, img, transform, landmarks) {
  const ctx = canvas.getContext('2d');

  canvas.width = 1080;
  canvas.height = 1920;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw image
  ctx.drawImage(
    img,
    transform.offsetX,
    transform.offsetY,
    img.width * transform.scale,
    img.height * transform.scale
  );

  // 🔴 Draw target eye line (15%)
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(0, 0.15 * canvas.height);
  ctx.lineTo(canvas.width, 0.15 * canvas.height);
  ctx.stroke();

  // 🟢 Draw actual detected eye position
  const eyeY =
    (landmarks.leftEye.y + landmarks.rightEye.y) / 2;

  const scaledEyeY =
    eyeY * transform.scale + transform.offsetY;

  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.arc(canvas.width / 2, scaledEyeY, 8, 0, Math.PI * 2);
  ctx.fill();
}