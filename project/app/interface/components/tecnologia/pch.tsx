"use client";

import { useState } from "react";

interface PCHProps {
  usinaId: string;
}

type PchFormState = {
  rio_aproveitado: string;
  vazao_media_m3s: string;
  vazao_turbinada_m3s: string;
  queda_bruta_m: string;
  queda_liquida_m: string;
  tipo_turbina: string;
  numero_turbinas: string;
  potencia_unitaria_turbina_mw: string;
  rendimento_turbina_percent: string;
  rendimento_gerador_percent: string;
  eficiencia_global_percent: string;
  tipo_gerador: string;
  tensao_nominal_sistema_kv: string;
  sistema_regulacao: string;
  nivel_tensao_conexao: string;
  subestacao_conexao: string;
  distribuidora_vinculada: string;
};

export default function PCH({ usinaId }: PCHProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<PchFormState>({
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

  const toNumberOrNull = (v: string) =>
    v === "" ? null : Number(v);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tecnologia/pch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        usina_id: usinaId,

          rio_aproveitado: form.rio_aproveitado || null,
          vazao_media_m3s: toNumberOrNull(form.vazao_media_m3s),
          vazao_turbinada_m3s: toNumberOrNull(form.vazao_turbinada_m3s),
          queda_bruta_m: toNumberOrNull(form.queda_bruta_m),
          queda_liquida_m: toNumberOrNull(form.queda_liquida_m),

          tipo_turbina: form.tipo_turbina || null,
          numero_turbinas: toNumberOrNull(form.numero_turbinas),
          potencia_unitaria_turbina_mw: toNumberOrNull(
            form.potencia_unitaria_turbina_mw
          ),

          rendimento_turbina_percent: toNumberOrNull(
            form.rendimento_turbina_percent
          ),
          rendimento_gerador_percent: toNumberOrNull(
            form.rendimento_gerador_percent
          ),
          eficiencia_global_percent: toNumberOrNull(
            form.eficiencia_global_percent
          ),

          tipo_gerador: form.tipo_gerador || null,
          tensao_nominal_sistema_kv: toNumberOrNull(
            form.tensao_nominal_sistema_kv
          ),
          sistema_regulacao: form.sistema_regulacao || null,
          nivel_tensao_conexao: form.nivel_tensao_conexao || null,
          subestacao_conexao: form.subestacao_conexao || null,
          distribuidora_vinculada: form.distribuidora_vinculada || null,
        }),
      });

      if (!res.ok) throw new Error();

      alert("PCH cadastrada com sucesso");
    } catch {
      alert("Erro ao salvar dados da PCH");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm mx-auto rounded-4" style={{ maxWidth: 1000 }}>
        <div className="card-header bg-white border-0 pt-4 px-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Etapa 3 de 4
          </span>
          <h2 className="fw-bold mb-1">Tecnologia — PCH</h2>
        </div>

        <div className="card-body px-4 pt-4 pb-5">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">

            {/* Hidrologia */}
            <div className="row g-3">
              <div className="form-floating col-md-6">
                <input className="form-control" value={form.rio_aproveitado}
                  onChange={(e) => setForm({ ...form, rio_aproveitado: e.target.value })} />
                <label>Rio aproveitado</label>
              </div>

              <div className="form-floating col-md-6">
                <input className="form-control" value={form.tipo_turbina}
                  onChange={(e) => setForm({ ...form, tipo_turbina: e.target.value })} />
                <label>Tipo de turbina</label>
              </div>
            </div>

            <div className="row g-3">
              {[
                ["vazao_media_m3s", "Vazão média (m³/s)"],
                ["vazao_turbinada_m3s", "Vazão turbinada (m³/s)"],
                ["queda_bruta_m", "Queda bruta (m)"],
                ["queda_liquida_m", "Queda líquida (m)"],
              ].map(([key, label]) => (
                <div key={key} className="col-md-3 form-floating">
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={(form as any)[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value } as PchFormState)
                    }
                  />
                  <label>{label}</label>
                </div>
              ))}
            </div>

            {/* Turbinas */}
            <div className="row g-3">
              {[
                ["numero_turbinas", "Número de turbinas"],
                ["potencia_unitaria_turbina_mw", "Potência unitária (MW)"],
                ["tipo_gerador", "Tipo de gerador"],
              ].map(([key, label]) => (
                <div key={key} className="col-md-4 form-floating">
                  <input
                    className="form-control"
                    value={(form as any)[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value } as PchFormState)
                    }
                  />
                  <label>{label}</label>
                </div>
              ))}
            </div>

            {/* Rendimentos */}
            <div className="row g-3">
              {[
                ["rendimento_turbina_percent", "Rendimento turbina (%)"],
                ["rendimento_gerador_percent", "Rendimento gerador (%)"],
                ["eficiencia_global_percent", "Eficiência global (%)"],
              ].map(([key, label]) => (
                <div key={key} className="col-md-4 form-floating">
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={(form as any)[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value } as PchFormState)
                    }
                  />
                  <label>{label}</label>
                </div>
              ))}
            </div>

            {/* Conexão elétrica */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={form.tensao_nominal_sistema_kv}
                  onChange={(e) =>
                    setForm({ ...form, tensao_nominal_sistema_kv: e.target.value })
                  }
                />
                <label>Tensão nominal do sistema (kV)</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  className="form-control"
                  value={form.sistema_regulacao}
                  onChange={(e) =>
                    setForm({ ...form, sistema_regulacao: e.target.value })
                  }
                />
                <label>Sistema de regulação</label>
              </div>
            </div>

            <div className="row g-3">
              {[
                ["nivel_tensao_conexao", "Nível de tensão de conexão"],
                ["subestacao_conexao", "Subestação de conexão"],
                ["distribuidora_vinculada", "Distribuidora vinculada"],
              ].map(([key, label]) => (
                <div key={key} className="col-md-4 form-floating">
                  <input
                    className="form-control"
                    value={(form as any)[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value } as PchFormState)
                    }
                  />
                  <label>{label}</label>
                </div>
              ))}
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
