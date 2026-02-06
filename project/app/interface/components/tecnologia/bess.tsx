"use client";

import { useState } from "react";

export default function BESS({ usinaId }: { usinaId: string }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    capacidade_unitaria_kwh: "",
    quantidade_modulos: "",
    tecnologia_bateria: "",
    fabricante_bateria: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/tecnologia/bess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usina_id: usinaId,
        capacidade_unitaria_kwh: Number(form.capacidade_unitaria_kwh),
        quantidade_modulos: Number(form.quantidade_modulos),
        tecnologia_bateria: form.tecnologia_bateria,
        fabricante_bateria: form.fabricante_bateria,
      }),
    });

    setLoading(false);
    alert("BESS cadastrado com sucesso");
  }

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-3">Dados do Armazenamento (BESS)</h3>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input className="form-control" type="number" placeholder="Capacidade unitária (kWh)"
          onChange={(e) => setForm({ ...form, capacidade_unitaria_kwh: e.target.value })} />

        <input className="form-control" type="number" placeholder="Quantidade de módulos"
          onChange={(e) => setForm({ ...form, quantidade_modulos: e.target.value })} />

        <input className="form-control" placeholder="Tecnologia da bateria"
          onChange={(e) => setForm({ ...form, tecnologia_bateria: e.target.value })} />

        <input className="form-control" placeholder="Fabricante da bateria"
          onChange={(e) => setForm({ ...form, fabricante_bateria: e.target.value })} />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar tecnologia"}
        </button>
      </form>
    </div>
  );
}
