/** Cada cena procura `public/media/esportes/<id>.mp4` (vídeo) e `<id>.jpg|jpeg|webp|png` (foto/poster). */
export const SCENE_IDS = ["ciclismo", "surfe", "esqui", "corrida"] as const;

export type SceneMedia = { video: string | null; image: string | null };
export type MediaMap = Record<string, SceneMedia>;

export const MEDIA_DIR = "/media/esportes";
export const IMAGE_EXTS = ["jpg", "jpeg", "webp", "png"] as const;
