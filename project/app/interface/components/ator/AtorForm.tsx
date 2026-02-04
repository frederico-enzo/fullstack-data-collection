"use client";
import { useState } from "react";
import { IMaskInput } from "react-imask";
interface AtorFormProps {
  onCreated: (ator: any) => void;
}
export default function AtorForm({ onCreated }: AtorFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    cnpj_cpf: "",
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/ator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error);
      setLoading(false);
      return;
    }
    const ator = await res.json();
    setLoading(false);
    onCreated(ator);
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

      {/* Nome */}
      <div className="form-floating">
        <input
          type="text"
          required
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="form-control rounded-3px"
          placeholder="Nome"
        />
        <label>Nome *</label>
      </div>

      {/* Telefone */}
      <div className="form-floating">
        <IMaskInput
          mask="(00) 00000-0000"
          value={form.telefone}
          onAccept={(value) =>
            setForm({ ...form, telefone: value })
          }
          className="form-control rounded-3px"
          placeholder="Telefone"
        />
        <label>Telefone *</label>
      </div>

      {/* Email */}
      <div className="form-floating">
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="form-control rounded-3px"
          placeholder="Email"
        />
        <label>Email *</label>
      </div>
      <div className="form-floating">
        <IMaskInput
          mask={[
            { mask: "000.000.000-00" },
            { mask: "00.000.000/0000-00" },
          ]}
          dispatch={(appended, dynamicMasked) => {
            const value = (dynamicMasked.value + appended).replace(/\D/g, "");

            return value.length > 11
              ? dynamicMasked.compiledMasks[1]
              : dynamicMasked.compiledMasks[0];
          }}
          value={form.cnpj_cpf}
          onAccept={(value) =>
            setForm({ ...form, cnpj_cpf: value })
          }
          className="form-control rounded-3px"
          placeholder="CPF ou CNPJ"
        />
        <label>CPF/CNPJ *</label>
      </div>
      {/* Botão */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary py-3 fw-semibold rounded-3px"
      >
        {loading ? "Salvando..." : "Salvar e continuar"}
      </button>
    </form>
  );
}
