"use client";

import { useState } from "react";

export default function PCH({ usinaId }: { usinaId: string }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    rio_aproveitado: "",
    vazao_media_m3s: "",
    queda_liquida_m: "",
    tipo_turbina: "",
    numero_turbinas: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/tecnologia/pch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usina_id: usinaId,
        rio_aproveitado: form.rio_aproveitado,
        vazao_media_m3s: Number(form.vazao_media_m3s),
        queda_liquida_m: Number(form.queda_liquida_m),
        tipo_turbina: form.tipo_turbina,
        numero_turbinas: Number(form.numero_turbinas),
      }),
    });

    setLoading(false);
    alert("PCH cadastrada com sucesso");
  }

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-3">Dados da PCH</h3>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input className="form-control" placeholder="Rio aproveitado"
          onChange={(e) => setForm({ ...form, rio_aproveitado: e.target.value })} />

        <input className="form-control" type="number" placeholder="Vazão média (m³/s)"
          onChange={(e) => setForm({ ...form, vazao_media_m3s: e.target.value })} />

        <input className="form-control" type="number" placeholder="Queda líquida (m)"
          onChange={(e) => setForm({ ...form, queda_liquida_m: e.target.value })} />

        <input className="form-control" placeholder="Tipo de turbina"
          onChange={(e) => setForm({ ...form, tipo_turbina: e.target.value })} />

        <input className="form-control" type="number" placeholder="Número de turbinas"
          onChange={(e) => setForm({ ...form, numero_turbinas: e.target.value })} />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar tecnologia"}
        </button>
      </form>
    </div>
  );
}
