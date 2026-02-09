"use client";

import { useState } from "react";

interface PCHProps {
  usinaId: string;
}

export default function PCH({ usinaId }: PCHProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    rio_aproveitado: "",
    vazao_media_m3s: "",
    vazao_turbinada_m3s: "",
    queda_bruta_m: "",
    queda_liquida_m: "",
    tipo_turbina: "",
    numero_turbinas: "",
    potencia_unitaria_turbina_mw: "",
    rendimento_turbina_percent: "",
    rendimento_gerador_percent: "",
    eficiencia_global_percent: "",
    tipo_gerador: "",
    tensao_nominal_sistema_kv: "",
    sistema_regulacao: "",
    nivel_tensao_conexao: "",
    subestacao_conexao: "",
    distribuidora_vinculada: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/tecnologia/pch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usina_id: usinaId,
        rio_aproveitado: form.rio_aproveitado || null,
        vazao_media_m3s: Number(form.vazao_media_m3s) || null,
        vazao_turbinada_m3s: Number(form.vazao_turbinada_m3s) || null,
        queda_bruta_m: Number(form.queda_bruta_m) || null,
        queda_liquida_m: Number(form.queda_liquida_m) || null,
        tipo_turbina: form.tipo_turbina || null,
        numero_turbinas: Number(form.numero_turbinas) || null,
        potencia_unitaria_turbina_mw:
          Number(form.potencia_unitaria_turbina_mw) || null,
        rendimento_turbina_percent:
          Number(form.rendimento_turbina_percent) || null,
        rendimento_gerador_percent:
          Number(form.rendimento_gerador_percent) || null,
        eficiencia_global_percent:
          Number(form.eficiencia_global_percent) || null,
        tipo_gerador: form.tipo_gerador || null,
        tensao_nominal_sistema_kv:
          Number(form.tensao_nominal_sistema_kv) || null,
        sistema_regulacao: form.sistema_regulacao || null,
        nivel_tensao_conexao: form.nivel_tensao_conexao || null,
        subestacao_conexao: form.subestacao_conexao || null,
        distribuidora_vinculada: form.distribuidora_vinculada || null,
      }),
    });

    if (!res.ok) {
      alert("Erro ao salvar dados da PCH");
      setLoading(false);
      return;
    }

    setLoading(false);
    alert("PCH cadastrada com sucesso");
  }

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-sm mx-auto rounded-4"
        style={{ maxWidth: "900px" }}
      >
        <div className="card-header bg-white border-0 pt-4 px-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Etapa 3 de 4
          </span>
          <h2 className="fw-bold mb-1">Tecnologia — PCH</h2>
          <p className="text-muted mb-0">
            Informações hidráulicas, eletromecânicas e de conexão.
          </p>
        </div>

        <div className="card-body px-4 pt-4 pb-5">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">

            {/* Hidráulica */}
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Rio aproveitado"
                value={form.rio_aproveitado}
                onChange={(e) =>
                  setForm({ ...form, rio_aproveitado: e.target.value })
                }
              />
              <label>Rio aproveitado</label>
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Vazão média"
                  value={form.vazao_media_m3s}
                  onChange={(e) =>
                    setForm({ ...form, vazao_media_m3s: e.target.value })
                  }
                />
                <label>Vazão média (m³/s)</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Vazão turbinada"
                  value={form.vazao_turbinada_m3s}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      vazao_turbinada_m3s: e.target.value,
                    })
                  }
                />
                <label>Vazão turbinada (m³/s)</label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Queda bruta"
                  value={form.queda_bruta_m}
                  onChange={(e) =>
                    setForm({ ...form, queda_bruta_m: e.target.value })
                  }
                />
                <label>Queda bruta (m)</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Queda líquida"
                  value={form.queda_liquida_m}
                  onChange={(e) =>
                    setForm({ ...form, queda_liquida_m: e.target.value })
                  }
                />
                <label>Queda líquida (m)</label>
              </div>
            </div>

            {/* Turbinas e geradores */}
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Tipo de turbina"
                value={form.tipo_turbina}
                onChange={(e) =>
                  setForm({ ...form, tipo_turbina: e.target.value })
                }
              />
              <label>Tipo de turbina</label>
            </div>

            <div className="row g-3">
              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Número de turbinas"
                  value={form.numero_turbinas}
                  onChange={(e) =>
                    setForm({ ...form, numero_turbinas: e.target.value })
                  }
                />
                <label>Número de turbinas</label>
              </div>

              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Potência unitária"
                  value={form.potencia_unitaria_turbina_mw}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      potencia_unitaria_turbina_mw: e.target.value,
                    })
                  }
                />
                <label>Potência unitária (MW)</label>
              </div>

              <div className="col-md-4 form-floating">
                <input
                  className="form-control"
                  placeholder="Tipo de gerador"
                  value={form.tipo_gerador}
                  onChange={(e) =>
                    setForm({ ...form, tipo_gerador: e.target.value })
                  }
                />
                <label>Tipo de gerador</label>
              </div>
            </div>

            {/* Rendimentos */}
            <div className="row g-3">
              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Rendimento turbina"
                  value={form.rendimento_turbina_percent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rendimento_turbina_percent: e.target.value,
                    })
                  }
                />
                <label>Rendimento da turbina (%)</label>
              </div>

              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Rendimento gerador"
                  value={form.rendimento_gerador_percent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rendimento_gerador_percent: e.target.value,
                    })
                  }
                />
                <label>Rendimento do gerador (%)</label>
              </div>

              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Eficiência global"
                  value={form.eficiencia_global_percent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      eficiencia_global_percent: e.target.value,
                    })
                  }
                />
                <label>Eficiência global (%)</label>
              </div>
            </div>

            {/* Conexão */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Tensão nominal"
                  value={form.tensao_nominal_sistema_kv}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tensao_nominal_sistema_kv: e.target.value,
                    })
                  }
                />
                <label>Tensão nominal do sistema (kV)</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  className="form-control"
                  placeholder="Sistema de regulação"
                  value={form.sistema_regulacao}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sistema_regulacao: e.target.value,
                    })
                  }
                />
                <label>Sistema de regulação</label>
              </div>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Nível de tensão de conexão"
                value={form.nivel_tensao_conexao}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nivel_tensao_conexao: e.target.value,
                  })
                }
              />
              <label>Nível de tensão de conexão</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Subestação de conexão"
                value={form.subestacao_conexao}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subestacao_conexao: e.target.value,
                  })
                }
              />
              <label>Subestação de conexão</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Distribuidora vinculada"
                value={form.distribuidora_vinculada}
                onChange={(e) =>
                  setForm({
                    ...form,
                    distribuidora_vinculada: e.target.value,
                  })
                }
              />
              <label>Distribuidora vinculada</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary py-3 fw-semibold mt-3"
            >
              {loading ? "Salvando..." : "Continuar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
