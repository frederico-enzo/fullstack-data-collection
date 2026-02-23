"use client";

import { useState } from "react";

interface BESSProps {
  usinaId: string;
  onNext: () => void;
}

export default function BESS({ usinaId, onNext }: BESSProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fator_capacidade_percent: "",
    tecnologia_bateria: "",
    fabricante_bateria: "",
    quantidade_modulos: "",
    capacidade_unitaria_kwh: "",
    tensao_nominal_sistema_v: "",
    corrente_nominal_a: "",
    profundidade_descarga_percent: "",
    vida_util_ciclos: "",
    tempo_recarga_horas: "",
    temperatura_operacao_c: "",
    sistema_gerenciamento_bms: "",
    sistema_conversao_potencia: "",
    eficiencia_conversao_percent: "",
    modalidade_operacao: "",
    tipo_conexao: "",
    nivel_tensao_conexao: "",
  });

  const toNumberOrNull = (value: string) =>
    value === "" ? null : Number(value);

  const toStringOrNull = (value: string) => {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tecnologia/bess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usina_id: usinaId,
          fator_capacidade_percent: toNumberOrNull(
            form.fator_capacidade_percent
          ),
          tecnologia_bateria: toStringOrNull(form.tecnologia_bateria),
          fabricante_bateria: toStringOrNull(form.fabricante_bateria),
          quantidade_modulos: toNumberOrNull(form.quantidade_modulos),
          capacidade_unitaria_kwh: toNumberOrNull(
            form.capacidade_unitaria_kwh
          ),
          tensao_nominal_sistema_v: toNumberOrNull(
            form.tensao_nominal_sistema_v
          ),
          corrente_nominal_a: toNumberOrNull(form.corrente_nominal_a),
          profundidade_descarga_percent: toNumberOrNull(
            form.profundidade_descarga_percent
          ),
          vida_util_ciclos: toNumberOrNull(form.vida_util_ciclos),
          tempo_recarga_horas: toNumberOrNull(form.tempo_recarga_horas),
          temperatura_operacao_c: toNumberOrNull(
            form.temperatura_operacao_c
          ),
          sistema_gerenciamento_bms: toStringOrNull(
            form.sistema_gerenciamento_bms
          ),
          sistema_conversao_potencia: toStringOrNull(
            form.sistema_conversao_potencia
          ),
          eficiencia_conversao_percent: toNumberOrNull(
            form.eficiencia_conversao_percent
          ),
          modalidade_operacao: toStringOrNull(form.modalidade_operacao),
          tipo_conexao: toStringOrNull(form.tipo_conexao),
          nivel_tensao_conexao: toStringOrNull(form.nivel_tensao_conexao),
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      alert("Armazenamento (BESS) cadastrado com sucesso");
      onNext();
    } catch {
      alert("Erro ao salvar dados do armazenamento (BESS)");
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

            {/* Bateria */}
            <div className="row g-3">

              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Temperatura de operação"
                  value={form.temperatura_operacao_c}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      temperatura_operacao_c: e.target.value,
                    })
                  }
                />
                <label>Temperatura de operação (°C)</label>
              </div>
              <div className="col-md-4 form-floating">
                <select
                  className="form-select rounded-3 border-secondary-subtle"
                  value={form.tecnologia_bateria}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tecnologia_bateria: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="LI_ION">LI-ION</option>
                  <option value="LI_PO">LI-PO</option>
                  <option value="CHUMBO_ACIDO">CHUMBO-ACIDO</option>
                  <option value="NICD">NICD</option>
                  <option value="NIMH">NIMH</option>
                  <option value="SODIO_ION">SODIO-ION</option>
                  <option value="ESTADO_SOLIDO">ESTADO SOLIDO</option>
                </select>
                <label>Tecnologia da bateria</label>
              </div>  

              <div className="col-md-4 form-floating">
                <input
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Fabricante da bateria"
                  value={form.fabricante_bateria}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fabricante_bateria: e.target.value,
                    })
                  }
                />
                <label>Fabricante da bateria</label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Quantidade de módulos"
                  value={form.quantidade_modulos}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantidade_modulos: e.target.value,
                    })
                  }
                />
                <label>Quantidade de módulos</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Capacidade unitária"
                  value={form.capacidade_unitaria_kwh}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      capacidade_unitaria_kwh: e.target.value,
                    })
                  }
                />
                <label>Capacidade unitária (kWh)</label>
              </div>
            </div>

            {/* Elétrico */}
            <div className="row g-3">
              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Tensão nominal"
                  value={form.tensao_nominal_sistema_v}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tensao_nominal_sistema_v: e.target.value,
                    })
                  }
                />
                <label>Tensão nominal do sistema (V)</label>
              </div>

              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Corrente nominal"
                  value={form.corrente_nominal_a}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      corrente_nominal_a: e.target.value,
                    })
                  }
                />
                <label>Corrente nominal (A)</label>
              </div>

              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Profundidade de descarga"
                  value={form.profundidade_descarga_percent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      profundidade_descarga_percent: e.target.value,
                    })
                  }
                />
                <label>Profundidade de descarga (%)</label>
              </div>
            </div>

            {/* Operação */}
            <div className="row g-3">
              <div className="col-md-3 form-floating">
                <input
                  type="number"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Vida útil"
                  value={form.vida_util_ciclos}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      vida_util_ciclos: e.target.value,
                    })
                  }
                />
                <label>Vida útil (ciclos)</label>
              </div>

              <div className="col-md-3 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Tempo de recarga"
                  value={form.tempo_recarga_horas}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tempo_recarga_horas: e.target.value,
                    })
                  }
                />
                <label>Tempo de recarga (h)</label>
              </div>
              <div className="col-md-3 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Fator de capacidade"
                  value={form.fator_capacidade_percent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fator_capacidade_percent: e.target.value,
                    })
                  }
                />
                <label>Fator de capacidade (%)</label>
              </div>
              <div className="form-floating col-md-3">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Eficiência de conversão"
                  value={form.eficiencia_conversao_percent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      eficiencia_conversao_percent: e.target.value,
                    })
                  }
                />
                <label>Eficiência de conversão (%)</label>
              </div>
            </div>
            <div className="row g-3">
              {/* Sistemas */}
              <div className="form-floating col-md-4">
                <input
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Sistema de gerenciamento (BMS)"
                  value={form.sistema_gerenciamento_bms}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sistema_gerenciamento_bms: e.target.value,
                    })
                  }
                />
                <label>Sistema de gerenciamento (BMS)</label>
              </div>

              <div className="form-floating col-md-4">
                <input
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Sistema de conversão de potência"
                  value={form.sistema_conversao_potencia}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sistema_conversao_potencia: e.target.value,
                    })
                  }
                />
                <label>Sistema de conversão de potência</label>
              </div>
              <div className="form-floating col-md-4">
                <select
                  className="form-select rounded-3 border-secondary-subtle"
                  value={form.tipo_conexao}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tipo_conexao: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="ON_GRID">ON GRID</option>
                  <option value="OFF_GRID">OFF GRID</option>
                  <option value="GRID_HIBRIDO">GRID HIBRIDO</option>
                </select>
                <label>Tipo de conexão</label>
              </div>
            </div>

            <div className="row g-3">
              {/* Conexão */}
              <div className="form-floating col-md-6">
                <input
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Modalidade de operação"
                  value={form.modalidade_operacao}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      modalidade_operacao: e.target.value,
                    })
                  }
                />
                <label>Modalidade de operação</label>
              </div>

              <div className="form-floating col-md-6">
                <input
                  className="form-control rounded-3 border-secondary-subtle"
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
