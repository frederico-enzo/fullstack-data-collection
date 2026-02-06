"use client";

import { useState } from "react";

export default function Fotovoltaica({ usinaId }: { usinaId: string }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    numero_modulos: "",
    potencia_unitaria_modulo_w: "",
    tipo_modulo: "",
    tipo_inversor: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/tecnologia/fotovoltaica", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usina_id: usinaId,
        numero_modulos: Number(form.numero_modulos),
        potencia_unitaria_modulo_w: Number(form.potencia_unitaria_modulo_w),
        tipo_modulo: form.tipo_modulo,
        tipo_inversor: form.tipo_inversor,
      }),
    });

    setLoading(false);
    alert("Fotovoltaica cadastrada com sucesso");
  }

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-3">Dados da Fotovoltaica</h3>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input className="form-control" type="number" placeholder="Número de módulos"
          onChange={(e) => setForm({ ...form, numero_modulos: e.target.value })} />

        <input className="form-control" type="number" placeholder="Potência do módulo (W)"
          onChange={(e) => setForm({ ...form, potencia_unitaria_modulo_w: e.target.value })} />

        <input className="form-control" placeholder="Tipo de módulo"
          onChange={(e) => setForm({ ...form, tipo_modulo: e.target.value })} />

        <input className="form-control" placeholder="Tipo de inversor"
          onChange={(e) => setForm({ ...form, tipo_inversor: e.target.value })} />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar tecnologia"}
        </button>
      </form>
    </div>
  );
}
