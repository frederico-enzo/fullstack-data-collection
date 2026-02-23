"use client";

import { useState } from "react";

interface FotovoltaicaProps {
  usinaId: string;
  onNext: () => void;
}

export default function Fotovoltaica({ usinaId, onNext }: FotovoltaicaProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    area_ocupada_m2: "",
    numero_modulos: "",
    tipo_modulo: "",
    potencia_unitaria_modulo_w: "",
    tipo_inversor: "",
    quantidade_inversores: "",
    tensao_nominal_sistema_v: "",
    irradiacao_media_kwh_m2_ano: "",
    temperatura_media_operacao_c: "",
    inclinacao_graus: "",
    orientacao_modulos: "",
    area_desmatada_ha: "",
    area_reaproveitada_ha: "",
    tipo_conexao: "",
    fase: "",
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
      const res = await fetch("/api/tecnologia/fotovoltaica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usina_id: usinaId,
          area_ocupada_m2: toNumberOrNull(form.area_ocupada_m2),
          numero_modulos: toNumberOrNull(form.numero_modulos),
          tipo_modulo: toStringOrNull(form.tipo_modulo),
          potencia_unitaria_modulo_w: toNumberOrNull(
            form.potencia_unitaria_modulo_w
          ),
          tipo_inversor: toStringOrNull(form.tipo_inversor),
          quantidade_inversores: toNumberOrNull(
            form.quantidade_inversores
          ),
          tensao_nominal_sistema_v: toNumberOrNull(
            form.tensao_nominal_sistema_v
          ),
          irradiacao_media_kwh_m2_ano: toNumberOrNull(
            form.irradiacao_media_kwh_m2_ano
          ),
          temperatura_media_operacao_c: toNumberOrNull(
            form.temperatura_media_operacao_c
          ),
          inclinacao_graus: toNumberOrNull(form.inclinacao_graus),
          orientacao_modulos: toStringOrNull(form.orientacao_modulos),
          area_desmatada_ha: toNumberOrNull(form.area_desmatada_ha),
          area_reaproveitada_ha: toNumberOrNull(
            form.area_reaproveitada_ha
          ),
          tipo_conexao: toStringOrNull(form.tipo_conexao),
          fase: toStringOrNull(form.fase),
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      alert("Fotovoltaica cadastrada com sucesso");
      onNext();
    } catch {
      alert("Erro ao salvar dados da fotovoltaica");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-sm mx-auto rounded-4"
        style={{ maxWidth: "1000px", minHeight: "760px" }}
      >
        <div className="card-header bg-white border-0 pb-0 pt-4 px-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Etapa 3 de 5
          </span>
          <h2 className="fw-bold mb-1">Tecnologia — Fotovoltaica</h2>
          <p className="text-muted mb-0">
            Informações técnicas, elétricas e ambientais.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-4 p-4 border rounded-4 bg-white shadow-sm"
        >

            {/* Área e módulos */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Área ocupada"
                  value={form.area_ocupada_m2}
                  onChange={(e) =>
                    setForm({ ...form, area_ocupada_m2: e.target.value })
                  }
                />
                <label>Área ocupada (m²)</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Número de módulos"
                  value={form.numero_modulos}
                  onChange={(e) =>
                    setForm({ ...form, numero_modulos: e.target.value })
                  }
                />
                <label>Número de módulos</label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <select
                  className="form-select rounded-3 border-secondary-subtle"
                  value={form.tipo_modulo}
                  onChange={(e) =>
                    setForm({ ...form, tipo_modulo: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="Monocristalino">Monocristalino</option>
                  <option value="Policristalino">Policristalino</option>
                  <option value="Filme fino">Filme fino</option>
                  <option value="Bifacial">Bifacial</option>
                  <option value="TOPCon">TOPCon</option>
                  <option value="Outro">Outro</option>
                </select>
                <label>Tipo de módulo</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Potência unitária"
                  value={form.potencia_unitaria_modulo_w}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      potencia_unitaria_modulo_w: e.target.value,
                    })
                  }
                />
                <label>Potência unitária do módulo (W)</label>
              </div>

            </div>

            {/* Inversores */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <select
                  className="form-select rounded-3 border-secondary-subtle"
                  value={form.tipo_inversor}
                  onChange={(e) =>
                    setForm({ ...form, tipo_inversor: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="OFFGRID">Off-grid</option>
                  <option value="CENTRAL">Central</option>
                  <option value="MICRO">Microinversor</option>
                  <option value="STRING">String</option>
                  <option value="HÍBRIDO">Híbrido</option>
                  <option value="OUTRO">Outro</option>
                </select>
                <label>Tipo de inversor</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Quantidade de inversores"
                  value={form.quantidade_inversores}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantidade_inversores: e.target.value,
                    })
                  }
                />
                <label>Quantidade de inversores</label>
              </div>
            </div>

            {/* Condições elétricas e ambientais */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
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

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Irradiação média"
                  value={form.irradiacao_media_kwh_m2_ano}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      irradiacao_media_kwh_m2_ano: e.target.value,
                    })
                  }
                />
                <label>Irradiação média (kWh/m²·ano)</label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Temperatura média"
                  value={form.temperatura_media_operacao_c}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      temperatura_media_operacao_c: e.target.value,
                    })
                  }
                />
                <label>Temperatura média (°C)</label>
              </div>

              <div className="col-md-4 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Inclinação"
                  value={form.inclinacao_graus}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      inclinacao_graus: e.target.value,
                    })
                  }
                />
                <label>Inclinação (graus)</label>
              </div>

              <div className="col-md-4 form-floating">
                <select
                  className="form-select rounded-3 border-secondary-subtle"
                  value={form.orientacao_modulos}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      orientacao_modulos: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="NORTE">Norte</option>
                  <option value="SUL">Sul</option>
                  <option value="LESTE">Leste</option>
                  <option value="OESTE">Oeste</option>
                </select>
                <label>Orientação dos módulos</label>
              </div>

            </div>

            {/* Uso do solo */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Área desmatada"
                  value={form.area_desmatada_ha}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      area_desmatada_ha: e.target.value,
                    })
                  }
                />
                <label>Área desmatada (ha)</label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3 border-secondary-subtle"
                  placeholder="Área reaproveitada"
                  value={form.area_reaproveitada_ha}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      area_reaproveitada_ha: e.target.value,
                    })
                  }
                />
                <label>Área reaproveitada (ha)</label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
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
                  <option value="ON_GRID">On-grid</option>
                  <option value="OFF_GRID">Off-grid</option>
                  <option value="HIBRIDO">Híbrido</option>
                  <option value="OUTRO">Outro</option>
                </select>
                <label>Tipo de conexão</label>
              </div>

              <div className="col-md-6 form-floating">
                <select
                  className="form-select rounded-3 border-secondary-subtle"
                  value={form.fase}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fase: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="MONOFASICA">Monofásica</option>
                  <option value="BIFASICA">Bifásica</option>
                  <option value="TRIFASICA">Trifásica</option>
                </select>
                <label>Fase</label>
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
