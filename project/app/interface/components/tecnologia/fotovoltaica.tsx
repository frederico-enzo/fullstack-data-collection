"use client";

import { useState } from "react";

interface FotovoltaicaProps {
  usinaId: string;
}

export default function Fotovoltaica({ usinaId }: FotovoltaicaProps) {
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
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/tecnologia/fotovoltaica", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usina_id: usinaId,
        area_ocupada_m2: Number(form.area_ocupada_m2) || null,
        numero_modulos: Number(form.numero_modulos) || null,
        tipo_modulo: form.tipo_modulo || null,
        eficiencia_modulos_percent:
          Number(form.potencia_unitaria_modulo_w) || null,
        tipo_inversor: form.tipo_inversor || null,
        quantidade_inversores:
          Number(form.quantidade_inversores) || null,
        eficiencia_media_inversores_percent:
          Number(form.tensao_nominal_sistema_v) || null,
        irradiacao_media_kwh_m2_ano:
          Number(form.irradiacao_media_kwh_m2_ano) || null,
        temperatura_media_operacao_c:
          Number(form.temperatura_media_operacao_c) || null,
        inclinacao_graus: Number(form.inclinacao_graus) || null,
        orientacao_modulos: form.orientacao_modulos || null,
        area_desmatada_ha: Number(form.area_desmatada_ha) || null,
        area_reaproveitada_ha:
          Number(form.area_reaproveitada_ha) || null,
      }),
    });

    if (!res.ok) {
      alert("Erro ao salvar dados da fotovoltaica");
      setLoading(false);
      return;
    }

    setLoading(false);
    alert("Fotovoltaica cadastrada com sucesso");
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
          <h2 className="fw-bold mb-1">Tecnologia — Fotovoltaica</h2>
          <p className="text-muted mb-0">
            Informações técnicas, elétricas e ambientais.
          </p>
        </div>

        <div className="card-body px-4 pt-4 pb-5">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">

            {/* Área e módulos */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-select"
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
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  className="form-control"
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

              <div className="col-md-6 form-floating">
                <select
                  className="form-select"
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
            </div>

            {/* Inversores */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="number"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-select"
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
                  className="form-control"
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
                  className="form-control"
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
