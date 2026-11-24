const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = { nome?: unknown; email?: unknown; telefone?: unknown; empresa?: unknown };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// caixa de entrada que recebe os contatos (dá para trocar sem mexer no código: variável CONTACT_EMAIL na Vercel)
const DEFAULT_INBOX = "appsquadfit@gmail.com";

// O FormSubmit ativa o formulário por ORIGEM (site que envia). Cada deploy da Vercel tem uma URL diferente, então
// usar a origem real pediria uma ativação nova a cada deploy. Enviamos sempre com esta origem fixa, já ativada.
const FORM_ORIGIN = "http://localhost:3000";

/**
 * Recebe o formulário "avise-me quando lançar" e entrega por e-mail (via FormSubmit, que não pede cadastro).
 * Se CONTACT_WEBHOOK_URL estiver definida (Zapier, Make, Slack, Discord...), o contato vai para lá em vez do e-mail.
 * Se a entrega falhar, o contato ainda fica nos logs da Vercel (Runtime Logs) para não se perder.
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "Pedido inválido." }, { status: 400 });
  }

  // campo-isca invisível: gente não preenche, robô sim. Responde "ok" para o robô não insistir.
  if (str(body.empresa, 100)) return Response.json({ ok: true });

  const nome = str(body.nome, 100);
  const email = str(body.email, 160).toLowerCase();
  const telefone = str(body.telefone, 32);
  const digits = telefone.replace(/\D/g, "");

  const errors: Record<string, string> = {};
  if (nome.length < 2) errors.nome = "Diga seu nome.";
  if (!EMAIL.test(email)) errors.email = "Esse e-mail não parece certo.";
  if (telefone && (digits.length < 10 || digits.length > 13)) errors.telefone = "Confira o telefone, com DDD.";
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const lead = { nome, email, telefone: telefone || null, origem: "site", quando: new Date().toISOString() };

  const text = `Novo contato SquadFit: ${nome} · ${email}${telefone ? ` · ${telefone}` : ""}`;
  const hook = process.env.CONTACT_WEBHOOK_URL;
  const inbox = process.env.CONTACT_EMAIL || DEFAULT_INBOX;

  try {
    const res = hook
      ? await fetch(hook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // `text` e `content` fazem Slack e Discord aceitarem a mesma mensagem
          body: JSON.stringify({ ...lead, text, content: text }),
          signal: AbortSignal.timeout(8000),
        })
      : await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json", Origin: FORM_ORIGIN, Referer: `${FORM_ORIGIN}/` },
          body: JSON.stringify({
            _subject: `SquadFit: novo contato de ${nome}`,
            _template: "table",
            _captcha: "false",
            Nome: nome,
            Email: email,
            Telefone: telefone || "(não informado)",
            Quando: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
          }),
          signal: AbortSignal.timeout(10000),
        });
    const reply = (await res.json().catch(() => ({}))) as { success?: unknown; message?: string };
    if (!res.ok || reply.success === false || reply.success === "false") throw new Error(`entrega recusada (${res.status}): ${reply.message ?? ""}`);
  } catch (err) {
    // o contato não se perde: fica nos Runtime Logs da Vercel mesmo se o e-mail falhar
    console.error("[contato] falha na entrega", err, JSON.stringify(lead));
    return Response.json({ ok: false, error: "Não deu para enviar agora. Tente de novo em instantes.", detail: String(err).slice(0, 300) }, { status: 502 });
  }

  return Response.json({ ok: true });
}
