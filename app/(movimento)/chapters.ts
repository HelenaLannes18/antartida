/** Capítulos do tour do app: cada um mostra uma tela real do aplicativo no celular. */
export const CHAPTERS = ["Início", "Match", "Chat", "Locais", "Agenda", "Grupos"] as const;

/** Rola até o meio do capítulo `i` do tour (a seção #tour tem uma pista "sticky" com um passo por capítulo). */
export function goChapter(i: number) {
  const el = document.getElementById("tour");
  if (!el) return;
  const steps = Number(el.dataset.steps) || CHAPTERS.length;
  const vh = window.innerHeight || 800;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top + (el.offsetHeight - vh) * ((i + 0.5) / steps), behavior: "smooth" });
}
