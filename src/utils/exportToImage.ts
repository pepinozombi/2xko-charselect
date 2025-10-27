import html2canvas from "html2canvas";

/**
 * Captura el nodo con el id dado y devuelve un blob y una blob URL temporal.
 * @param elementId id del nodo DOM a capturar
 * @param width desired output width
 * @param height desired output height
 */
export async function captureToBlobUrl(elementId: string, width = 1920, height = 1080): Promise<{ blob: Blob; url: string }> {
  const el = document.getElementById(elementId);
  if (!el) throw new Error("Elemento no encontrado: " + elementId);

  // ajustamos escala para mantener calidad en la exportación
  const scale = Math.min(width / el.clientWidth, height / el.clientHeight);

  const canvas = await html2canvas(el, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error("No se pudo generar blob");
      const url = URL.createObjectURL(blob);
      resolve({ blob, url });
    }, "image/png");
  });
}
