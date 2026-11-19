"use client";

import { useEffect, useRef } from "react";

/** Vídeo mudo em loop que só toca enquanto está na tela. */
export default function ClVideo({ src, poster }: { src: string; poster: string }) {
  const v = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = v.current!;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <video ref={v} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" disablePictureInPicture />;
}
