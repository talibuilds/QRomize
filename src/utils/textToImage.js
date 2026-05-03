export const textToImage = (text, color = "#000000", bgColor = "#ffffff") => {
  if (!text) return null;
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  // Set dimensions based on text length to keep it reasonable
  canvas.width = 200;
  canvas.height = 200;
  
  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Text
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  // Dynamic font size
  const fontSize = text.length > 2 ? (text.length > 5 ? 40 : 60) : 100;
  ctx.font = `bold ${fontSize}px sans-serif`;
  
  // Draw text
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  return canvas.toDataURL("image/png");
};
