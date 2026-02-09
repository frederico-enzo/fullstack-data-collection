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
  const [municipioNome, setMunicipioNome] = useState("");

  const [form, setForm] = useState({
    tecnologia: "",
    municipio_id: "",
    tipo_comprador: "",
    tipo_contrato: "",
    media_energia_gerada_mensal: "",
    media_volume_vendido: "",
    capacidade_anual_geracao: "",
    data_inicio_operacao: "",
    data_inicio_coleta: "",
  });

  useEffect(() => {
    fetch("/api/municipio")
      .then((res) => res.json())
      .then(setMunicipios)
      .catch(() => alert("Erro ao carregar municípios"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.municipio_id) {
      alert("Selecione um município válido da lista.");
      return;
    }

    setLoading(true);

    const payload = {
      tecnologia: form.tecnologia,
      municipio_id: Number(form.municipio_id),
      tipo_comprador: form.tipo_comprador,
      tipo_contrato: form.tipo_contrato,
      ator_id: Number(atorId),

      media_energia_gerada_mensal: form.media_energia_gerada_mensal
        ? Number(form.media_energia_gerada_mensal)
        : null,

      media_volume_vendido: form.media_volume_vendido
        ? Number(form.media_volume_vendido)
        : null,

      capacidade_anual_geracao: form.capacidade_anual_geracao
        ? Number(form.capacidade_anual_geracao)
        : null,

      data_inicio_operacao: form.data_inicio_operacao
        ? new Date(form.data_inicio_operacao)
        : null,

      data_inicio_coleta: form.data_inicio_coleta
        ? new Date(form.data_inicio_coleta)
        : null,
    };

    const res = await fetch("/api/geradora", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
        style={{ maxWidth: 720 }}
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
            <div className="row g-3">
              {/* Tecnologia */}
              <div className="col-md-6 form-floating">
                <select
                  className="form-select"
                  required
                  value={form.tecnologia}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tecnologia: e.target.value }))
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
              <div className="col-md-6 form-floating">
                <input
                  type="text"
                  className="form-control"
                  list="municipios-list"
                  required
                  placeholder="Município"
                  value={municipioNome}
                  onChange={(e) => {
                    const nome = e.target.value;
                    setMunicipioNome(nome);

                    const municipio = municipios.find(
                      (m) => m.nome === nome
                    );

                    setForm((p) => ({
                      ...p,
                      municipio_id: municipio ? municipio.id : "",
                    }));
                  }}
                />
                <datalist id="municipios-list">
                  {municipios.map((m) => (
                    <option key={m.id} value={m.nome} />
                  ))}
                </datalist>
                <label>Município *</label>
              </div>

              {/* Tipo comprador */}
              <div className="col-md-6 form-floating">
                <select
                  className="form-select"
                  required
                  value={form.tipo_comprador}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tipo_comprador: e.target.value }))
                  }
                >
                  <option value="">Selecione</option>
                  <option value="COMERCIALIZADORAS">Comercializadoras</option>
                  <option value="AGREGADORES">Agregadores</option>
                  <option value="CENTRAIS_COMPENSACAO">
                    Centrais de compensação
                  </option>
                  <option value="COMERCIALIZADORAS_VAREJISTAS">
                    Varejistas
                  </option>
                </select>
                <label>Tipo de comprador *</label>
              </div>

              {/* Tipo contrato */}
              <div className="col-md-6 form-floating">
                <select
                  className="form-select"
                  required
                  value={form.tipo_contrato}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tipo_contrato: e.target.value }))
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
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Média mensal"
                  value={form.media_energia_gerada_mensal}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      media_energia_gerada_mensal: e.target.value,
                    }))
                  }
                />
                <label>Média mensal de energia gerada (MWh)</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Média mensal"
                  value={form.media_volume_vendido}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      media_volume_vendido: e.target.value,
                    }))
                  }
                />
                <label>Média mensal de volume vendido (MWh)</label>
              </div>

              <div className="col-md-12 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Capacidade anual"
                  value={form.capacidade_anual_geracao}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      capacidade_anual_geracao: e.target.value,
                    }))
                  }
                />
                <label>Capacidade anual de geração (MWh)</label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="date"
                  className="form-control"
                  value={form.data_inicio_operacao}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      data_inicio_operacao: e.target.value,
                    }))
                  }
                />
                <label>Data início operação</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="date"
                  className="form-control"
                  value={form.data_inicio_coleta}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      data_inicio_coleta: e.target.value,
                    }))
                  }
                />
                <label>Data início coleta</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary py-3 fw-semibold rounded-3 mt-3"
            >
              {loading ? "Salvando..." : "Continuar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
