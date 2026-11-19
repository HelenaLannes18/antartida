import { existsSync } from "node:fs";
import path from "node:path";
import Hero from "./Hero";
import { IMAGE_EXTS, MEDIA_DIR, SCENE_IDS, type MediaMap } from "./media";

/** Vê quais fotos/vídeos existem em public/media/esportes; a cena sem arquivo usa o desenho de reserva. */
function findMedia(): MediaMap {
  const dir = path.join(process.cwd(), "public", MEDIA_DIR);
  const map: MediaMap = {};
  for (const id of SCENE_IDS) {
    const image = IMAGE_EXTS.find((ext) => existsSync(path.join(dir, `${id}.${ext}`)));
    map[id] = {
      video: existsSync(path.join(dir, `${id}.mp4`)) ? `${MEDIA_DIR}/${id}.mp4` : null,
      image: image ? `${MEDIA_DIR}/${id}.${image}` : null,
    };
  }
  return map;
}

export default function Esportes() {
  return (
    <main>
      <Hero media={findMedia()} />
    </main>
  );
}
