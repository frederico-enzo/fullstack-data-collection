"use client";

import { useRef, useState } from "react";
import { IMaskInput } from "react-imask";

interface AtorFormProps {
  onCreated: (ator: any) => void;
}

export default function AtorForm({ onCreated }: AtorFormProps) {
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [existingAtor, setExistingAtor] = useState<any | null>(null);

  const lookupTimeout = useRef<NodeJS.Timeout | null>(null);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    cnpj_cpf: "",
  });

  async function fetchAtorByDocumento(value: string) {
    const clean = value.replace(/\D/g, "");
    if (clean.length !== 11 && clean.length !== 14) return;

    const res = await fetch(`/api/ator/by-document?cnpj_cpf=${clean}`);

    if (res.status === 204) {
      setFound(false);
      setExistingAtor(null);
      return;
    }

    if (res.ok) {
      const ator = await res.json();

      setForm({
        nome: ator.nome || "",
        telefone: ator.telefone || "",
        email: ator.email || "",
        cnpj_cpf: value,
      });

      setExistingAtor(ator);
      setFound(true);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (found && existingAtor) {
      onCreated(existingAtor);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Erro ao salvar ator");
      setLoading(false);
      return;
    }

    const ator = await res.json();
    setLoading(false);
    onCreated(ator);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column gap-4 p-4 border rounded-4 bg-white shadow-sm"
    >
      {found && (
        <div className="alert alert-info py-2 px-3 small mb-2">
          Ator já cadastrado. Dados carregados automaticamente.
        </div>
      )}

      {/* CPF / CNPJ */}
      <div className="form-floating">
        <IMaskInput
          mask={[
            { mask: "000.000.000-00" },
            { mask: "00.000.000/0000-00" },
          ]}
          dispatch={(appended, dynamicMasked) => {
            const value = dynamicMasked.value + appended;
            return value.length > 14
              ? dynamicMasked.compiledMasks[1]
              : dynamicMasked.compiledMasks[0];
          }}
          value={form.cnpj_cpf}
          onAccept={(value) =>
            setForm((prev) => ({ ...prev, cnpj_cpf: value }))
          }
          onComplete={fetchAtorByDocumento}
          className="form-control rounded-3 border-secondary-subtle"
          placeholder="CPF ou CNPJ"
          required
        />
        <label>CPF/CNPJ *</label>
      </div>

      {/* Nome */}
      <div className="form-floating">
        <input
          type="text"
          required
          disabled={found}
          value={form.nome}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, nome: e.target.value }))
          }
          className="form-control rounded-3 border-secondary-subtle"
          placeholder="Nome"
        />
        <label>Nome *</label>
      </div>

      {/* Telefone */}
      <div className="form-floating">
        <IMaskInput
          mask="(00) 00000-0000"
          disabled={found}
          value={form.telefone}
          onAccept={(value) =>
            setForm((prev) => ({ ...prev, telefone: value }))
          }
          className="form-control rounded-3 border-secondary-subtle"
          placeholder="Telefone"
        />
        <label>Telefone</label>
      </div>

      {/* Email */}
      <div className="form-floating">
        <input
          type="email"
          required
          disabled={found}
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          className="form-control rounded-3 border-secondary-subtle"
          placeholder="Email"
        />
        <label>Email *</label>
      </div>

      {/* Botão */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary py-2 fw-semibold rounded-3 shadow-sm"
      >
        {found
          ? "Usar ator existente"
          : loading
          ? "Salvando..."
          : "Continuar"}
      </button>
    </form>
  );
}
