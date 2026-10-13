import { useState, useCallback } from "react";
import ImageLightbox from "./ImageLightbox";

/**
 * Opt-in zoomable image for case-study content screenshots, detailed
 * design crops and UI prototypes. Navigation cards, logos, avatars and
 * icons must NOT use this component.
 */
export default function ZoomableImage({ src, alt = "", className = "", imgClassName = "", style, loading = "lazy" }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${imgClassName}`.trim()}
        style={style}
        loading={loading}
        onClick={() => setOpen(true)}
      />
      <ImageLightbox src={src} alt={alt} isOpen={open} onClose={close} solid />
    </>
  );
}
