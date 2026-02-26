"use client";

import { useState } from "react";
import { useGlobalToast } from "@/app/components/GlobalToastProvider";

interface PCHProps {
  usinaId: string;
  onNext: () => void;
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

const hidrologiaCampos: Array<[keyof PchFormState, string]> = [
  ["vazao_media_m3s", "Vazão média (m³/s)"],
  ["vazao_turbinada_m3s", "Vazão turbinada (m³/s)"],
  ["queda_bruta_m", "Queda bruta (m)"],
  ["queda_liquida_m", "Queda líquida (m)"],
];

const turbinaCampos: Array<[keyof PchFormState, string]> = [
  ["numero_turbinas", "Número de turbinas"],
  ["potencia_unitaria_turbina_mw", "Potência unitária (MW)"],
  ["tipo_gerador", "Tipo de gerador"],
];

const rendimentoCampos: Array<[keyof PchFormState, string]> = [
  ["rendimento_turbina_percent", "Rendimento turbina (%)"],
  ["rendimento_gerador_percent", "Rendimento gerador (%)"],
  ["eficiencia_global_percent", "Eficiência global (%)"],
];

const conexaoCampos: Array<[keyof PchFormState, string]> = [
  ["nivel_tensao_conexao", "Nível de tensão de conexão"],
  ["subestacao_conexao", "Subestação de conexão"],
  ["distribuidora_vinculada", "Distribuidora vinculada"],
];

export default function PCH({ usinaId, onNext }: PCHProps) {
  const notify = useGlobalToast();
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

      notify("PCH cadastrada com sucesso", "success");
      onNext();
    } catch {
      notify("Erro ao salvar dados da PCH", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-3 py-md-4">
      <div
        className="card border-0 shadow-sm mx-auto rounded-4"
        style={{ maxWidth: "960px", width: "100%" }}
      >
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3 gap-md-4 p-3 p-md-4 border rounded-4 bg-body-tertiary shadow-sm"
        >

            {/* Hidrologia */}
            <div className="row g-3">
              <div className="form-floating col-md-6">
                <input className="form-control rounded-3 border-secondary-subtle" value={form.rio_aproveitado}
                  onChange={(e) => setForm({ ...form, rio_aproveitado: e.target.value })} />
                <label>Rio aproveitado</label>
              </div>

              <div className="form-floating col-md-6">
                <input className="form-control rounded-3 border-secondary-subtle" value={form.tipo_turbina}
                  onChange={(e) => setForm({ ...form, tipo_turbina: e.target.value })} />
                <label>Tipo de turbina</label>
              </div>
            </div>

            <div className="row g-3">
              {hidrologiaCampos.map(([key, label]) => (
                <div key={key} className="col-md-3 form-floating">
                  <input
                    type="number"
                    step="0.01"
                    className="form-control rounded-3 border-secondary-subtle"
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  />
                  <label>{label}</label>
                </div>
              ))}
            </div>

            {/* Turbinas */}
            <div className="row g-3">
              {turbinaCampos.map(([key, label]) => (
                <div key={key} className="col-md-4 form-floating">
                  <input
                    className="form-control rounded-3 border-secondary-subtle"
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  />
                  <label>{label}</label>
                </div>
              ))}
            </div>

            {/* Rendimentos */}
            <div className="row g-3">
              {rendimentoCampos.map(([key, label]) => (
                <div key={key} className="col-md-4 form-floating">
                  <input
                    type="number"
                    step="0.01"
                    className="form-control rounded-3 border-secondary-subtle"
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
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
                  className="form-control rounded-3 border-secondary-subtle"
                  value={form.tensao_nominal_sistema_kv}
                  onChange={(e) =>
                    setForm({ ...form, tensao_nominal_sistema_kv: e.target.value })
                  }
                />
                <label>Tensão nominal do sistema (kV)</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  className="form-control rounded-3 border-secondary-subtle"
                  value={form.sistema_regulacao}
                  onChange={(e) =>
                    setForm({ ...form, sistema_regulacao: e.target.value })
                  }
                />
                <label>Sistema de regulação</label>
              </div>
            </div>

            <div className="row g-3">
              {conexaoCampos.map(([key, label]) => (
                <div key={key} className="col-md-4 form-floating">
                  <input
                    className="form-control rounded-3 border-secondary-subtle"
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  />
                  <label>{label}</label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary py-2 fw-semibold rounded-3 shadow-sm"
            >
              {loading ? "Salvando..." : "Continuar"}
            </button>
        </form>
      </div>
    </div>
  );
}
