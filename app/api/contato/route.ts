const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = { nome?: unknown; email?: unknown; telefone?: unknown; empresa?: unknown };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Valida e GUARDA o contato do formulário "avise-me quando lançar".
 *
 * O e-mail para appsquadfit@gmail.com é enviado pelo navegador (ver Contato.tsx), porque o FormSubmit bloqueia
 * pedidos vindos dos servidores da Vercel (403). Esta rota é o registro de segurança: todo contato válido fica nos
 * Runtime Logs da Vercel, e, se CONTACT_WEBHOOK_URL estiver definida (Zapier, Make, Slack, Discord...), segue para lá também.
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
  console.log("[contato] novo contato", JSON.stringify(lead));

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    const text = `Novo contato SquadFit: ${nome} · ${email}${telefone ? ` · ${telefone}` : ""}`;
    try {
      // `text` e `content` fazem Slack e Discord aceitarem a mesma mensagem
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, text, content: text }),
        signal: AbortSignal.timeout(8000),
      });
    } catch (err) {
      console.error("[contato] webhook falhou", err);
    }
  }

  return Response.json({ ok: true });
}
