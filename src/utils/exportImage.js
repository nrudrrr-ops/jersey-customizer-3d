export const exportCanvasAsPNG = () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = `jersey-design-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};