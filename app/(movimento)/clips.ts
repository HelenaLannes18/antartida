export type Clip = {
  id: string;
  /** nome do esporte na legenda */
  label: string;
  /** caminho do vídeo dentro de /public */
  src: string;
  /** foto de capa (usada enquanto carrega e por quem pede menos movimento) */
  poster?: string;
  /** segundo do arquivo em que o corte começa */
  start: number;
  /** quanto tempo o corte fica na tela, em segundos */
  len: number;
};

/**
 * A montagem toca nesta ordem. Vídeo que não existir em /public é pulado, então dá para
 * trocar ou acrescentar filmagens só mexendo aqui (e soltando o arquivo na pasta).
 * Mantenha `start + len` menor que a duração do arquivo.
 */
export const CLIPS: Clip[] = [
  { id: "trilha", label: "Corrida de trilha", src: "/media/movimento/trilha.mp4", poster: "/media/movimento/trilha.jpg", start: 0.4, len: 3.2 },
  { id: "surfe", label: "Surfe", src: "/media/esportes/surfe.mp4", poster: "/media/esportes/surfe.jpg", start: 6, len: 3 },
  { id: "academia", label: "Academia", src: "/media/movimento/academia-cordas.mp4", poster: "/media/movimento/academia-cordas.jpg", start: 1.8, len: 3 },
  { id: "ciclismo", label: "Mountain bike", src: "/media/esportes/ciclismo.mp4", poster: "/media/esportes/ciclismo.jpg", start: 0.6, len: 3 },
  { id: "montanha", label: "Montanha", src: "/media/movimento/montanha.mp4", poster: "/media/movimento/montanha.jpg", start: 1, len: 3 },
  { id: "corrida", label: "Corrida de pista", src: "/media/esportes/corrida.mp4", poster: "/media/esportes/corrida.jpg", start: 1, len: 3 },
  { id: "esqui", label: "Esqui", src: "/media/esportes/esqui.mp4", poster: "/media/esportes/esqui.jpg", start: 2, len: 3 },
  { id: "dupla", label: "Treino em dupla", src: "/media/movimento/academia-agachamento.mp4", poster: "/media/movimento/academia-agachamento.jpg", start: 0.4, len: 3 },
  { id: "paddle", label: "Stand-up paddle", src: "/media/movimento/paddle.mp4", poster: "/media/movimento/paddle.jpg", start: 5.4, len: 3.4 },
];
