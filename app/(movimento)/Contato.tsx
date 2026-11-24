"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";
type Errors = Partial<Record<"nome" | "email" | "telefone", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// caixa de entrada que recebe os contatos
const INBOX = "appsquadfit@gmail.com";

/** (11) 98765-4321 enquanto digita; números com +55 ou mais de 11 dígitos ficam só com dígitos. */
function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 13);
  if (d.length > 11) return d;
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(nome: string, email: string, telefone: string): Errors {
  const errors: Errors = {};
  if (nome.trim().length < 2) errors.nome = "Diga seu nome.";
  if (!EMAIL.test(email.trim())) errors.email = "Esse e-mail não parece certo.";
  const digits = telefone.replace(/\D/g, "");
  if (telefone && (digits.length < 10 || digits.length > 13)) errors.telefone = "Confira o telefone, com DDD.";
  return errors;
}

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [done, setDone] = useState("");

  const clear = (key: keyof Errors) => setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status === "sending") return;
    const found = validate(nome, email, telefone);
    setErrors(found);
    if (Object.keys(found).length) {
      // leva o foco ao primeiro campo com problema (no celular, abre o teclado certo)
      const first = (["nome", "email", "telefone"] as const).find((k) => found[k]);
      if (first) ev.currentTarget.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const data = new FormData(ev.currentTarget);
    const first = nome.trim().split(/\s+/)[0];

    // campo-isca preenchido = robô: finge que deu certo e não manda nada
    if (data.get("empresa")) {
      setDone(first);
      setStatus("ok");
      return;
    }

    try {
      // 1) registro de segurança no servidor (Runtime Logs da Vercel); só interrompe se o servidor recusar os dados
      const saved = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone }),
      }).catch(() => null);
      if (saved && saved.status === 422) {
        const json = (await saved.json().catch(() => ({}))) as { errors?: Errors };
        if (json.errors) setErrors(json.errors);
        setStatus("error");
        return;
      }

      // 2) o e-mail para a equipe sai do navegador: o FormSubmit bloqueia pedidos vindos de servidores
      const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `SquadFit: novo contato de ${nome.trim()}`,
          _template: "table",
          _captcha: "false",
          Nome: nome.trim(),
          Email: email.trim(),
          Telefone: telefone || "(não informado)",
          Quando: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: unknown };
      if (res.ok && json.success !== false && json.success !== "false") {
        setDone(first);
        setStatus("ok");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="ct-done" role="status">
        <i className="ct-done-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </i>
        <h3>Valeu, {done}!</h3>
        <p>Seu contato está na lista. Assim que o SquadFit for lançado, você fica sabendo.</p>
      </div>
    );
  }

  const field = (key: keyof Errors) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `ct-${key}-err` : undefined,
  });

  return (
    <form className="ct-form" onSubmit={submit} noValidate>
      <label className="ct-f">
        <span className="ct-l">Nome</span>
        <input
          name="nome"
          type="text"
          autoComplete="name"
          autoCapitalize="words"
          maxLength={100}
          placeholder="Como podemos te chamar?"
          value={nome}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNome(e.target.value);
            clear("nome");
          }}
          {...field("nome")}
        />
        {errors.nome ? <em id="ct-nome-err" className="ct-err">{errors.nome}</em> : null}
      </label>

      <label className="ct-f">
        <span className="ct-l">E-mail</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={160}
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clear("email");
          }}
          {...field("email")}
        />
        {errors.email ? <em id="ct-email-err" className="ct-err">{errors.email}</em> : null}
      </label>

      <label className="ct-f">
        <span className="ct-l">
          Telefone <small>opcional</small>
        </span>
        <input
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          placeholder="(11) 90000-0000"
          value={telefone}
          onChange={(e) => {
            setTelefone(maskPhone(e.target.value));
            clear("telefone");
          }}
          {...field("telefone")}
        />
        {errors.telefone ? <em id="ct-telefone-err" className="ct-err">{errors.telefone}</em> : null}
      </label>

      {/* isca para robôs: fora da tela, fora da tabulação, sem preenchimento automático */}
      <div className="ct-hp" aria-hidden="true">
        <label>
          Empresa
          <input name="empresa" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="ct-btn" type="submit" disabled={status === "sending"}>
        <span>{status === "sending" ? "Enviando…" : "Quero ser avisado"}</span>
        <b aria-hidden="true">→</b>
      </button>

      {status === "error" ? (
        <p className="ct-fail" role="alert">
          Não deu para enviar agora. Confira os campos e tente de novo.
        </p>
      ) : null}

      <p className="ct-note">Usamos seus dados só para avisar sobre o lançamento. Nada de spam.</p>
    </form>
  );
}
