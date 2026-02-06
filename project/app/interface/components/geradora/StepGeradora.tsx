"use client";

import { useEffect, useState } from "react";

interface Municipio {
  id: string;
  nome: string;
}

interface StepGeradoraProps {
  atorId: string;
  onNext: (usinaId: string, tecnologia: string) => void;
}

export default function StepGeradora({ atorId, onNext }: StepGeradoraProps) {
  const [loading, setLoading] = useState(false);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const [form, setForm] = useState({
    tecnologia: "",
    municipio_id: "",
    tipo_comprador: "",
    tipo_contrato: "",
    media_energia_gerada_mensal: "",
  });

  useEffect(() => {
    fetch("/api/municipio")
      .then((res) => res.json())
      .then(setMunicipios)
      .catch(() => alert("Erro ao carregar municípios"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/geradora", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tecnologia: form.tecnologia,
        municipio_id: form.municipio_id,
        tipo_comprador: form.tipo_comprador,
        tipo_contrato: form.tipo_contrato,
        ator_id: atorId,
        media_energia_gerada_mensal: form.media_energia_gerada_mensal
          ? Number(form.media_energia_gerada_mensal)
          : null,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      alert(err?.error || "Erro ao salvar geradora");
      setLoading(false);
      return;
    }

    const usina = await res.json();
    setLoading(false);

    onNext(usina.id, usina.tecnologia);
  }

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-sm mx-auto rounded-4"
        style={{ maxWidth: "720px" }}
      >
        <div className="card-header bg-white border-0 pt-4 px-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Etapa 2 de 4
          </span>
          <h2 className="fw-bold mb-1">Dados da Geradora</h2>
          <p className="text-muted mb-0">Informações gerais da unidade.</p>
        </div>

        <div className="card-body px-4 pt-4 pb-5">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Tecnologia */}
            <div className="form-floating">
              <select
                className="form-select"
                required
                value={form.tecnologia}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, tecnologia: e.target.value }))
                }
              >
                <option value="">Selecione</option>
                <option value="FOTOVOLTAICA">Fotovoltaica</option>
                <option value="BIOGAS">Biogás</option>
                <option value="PCH">PCH</option>
                <option value="ARMAZENAMENTO">Armazenamento</option>
              </select>
              <label>Tecnologia *</label>
            </div>

            {/* Município */}
            <div className="form-floating">
              <select
                className="form-select"
                required
                value={form.municipio_id}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, municipio_id: e.target.value }))
                }
              >
                <option value="">Selecione o município</option>
                {municipios.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </select>
              <label>Município *</label>
            </div>

            {/* Tipo comprador (comprador_enum) */}
            <div className="form-floating">
              <select
                className="form-select"
                required
                value={form.tipo_comprador}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    tipo_comprador: e.target.value,
                  }))
                }
              >
                <option value="">Selecione</option>
                <option value="COMERCIALIZADORAS">Comercializadoras</option>
                <option value="AGREGADORES">Agregadores</option>
                <option value="CENTRAIS_COMPENSACAO">
                  Centrais de compensação
                </option>
                <option value="COMERCIALIZADORAS_VAREJISTAS">Varejistas</option>
              </select>
              <label>Tipo de comprador *</label>
            </div>

            {/* Tipo contrato (contrato_enum) */}
            <div className="form-floating">
              <select
                className="form-select"
                required
                value={form.tipo_contrato}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    tipo_contrato: e.target.value,
                  }))
                }
              >
                <option value="">Selecione</option>
                <option value="CCEAL">CCEAL</option>
                <option value="ACR">ACR</option>
                <option value="GD">GD</option>
                <option value="BATERIAS">Baterias</option>
                <option value="VAREJISTAS">Varejistas</option>
              </select>
              <label>Tipo de contrato *</label>
            </div>

            {/* Média mensal */}
            <div className="form-floating">
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Média mensal"
                value={form.media_energia_gerada_mensal}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    media_energia_gerada_mensal: e.target.value,
                  }))
                }
              />
              <label>Média mensal de energia gerada (MWh)</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary py-3 fw-semibold rounded-3px mt-3"
            >
              {loading ? "Salvando..." : "Salvar e continuar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
