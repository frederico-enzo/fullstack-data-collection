"use client";

import { useState } from "react";

interface StepEquipamentoProps {
  usinaId: string;
}

export default function StepEquipamento({ usinaId }: StepEquipamentoProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tipo_equipamento: "",
    fabricante: "",
    modelo: "",
    potencia_nominal: "",
    eficiencia_percent: "",
    ano_fabricacao: "",
    valor: "",
    vida_util_anos: "",
  });

  const toNumberOrNull = (value: string) =>
    value.trim() === "" ? null : Number(value);

  const toStringOrNull = (value: string) => {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/equipamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usina_id: usinaId,
          tipo_equipamento: toStringOrNull(form.tipo_equipamento),
          fabricante: toStringOrNull(form.fabricante),
          modelo: toStringOrNull(form.modelo),
          potencia_nominal: toNumberOrNull(form.potencia_nominal),
          eficiencia_percent: toNumberOrNull(form.eficiencia_percent),
          ano_fabricacao: toNumberOrNull(form.ano_fabricacao),
          valor: toNumberOrNull(form.valor),
          vida_util_anos: toNumberOrNull(form.vida_util_anos),
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      alert("Equipamento cadastrado e vinculado à geradora com sucesso");
    } catch {
      alert("Erro ao salvar equipamento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-sm mx-auto rounded-4"
        style={{ maxWidth: "900px" }}
      >
        <div className="card-header bg-white border-0 pb-0 pt-4 px-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Etapa 4 de 4
          </span>
          <h2 className="fw-bold mb-1">Equipamento</h2>
          <p className="text-muted mb-0">
            Dados do equipamento vinculado a esta unidade geradora.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-4 p-4 border rounded-4 bg-white shadow-sm"
        >
          <div className="row g-3">
            <div className="col-md-6 form-floating">
              <input
                className="form-control rounded-3 border-secondary-subtle"
                value={form.tipo_equipamento}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    tipo_equipamento: e.target.value,
                  }))
                }
                placeholder="Tipo de equipamento"
              />
              <label>Tipo de equipamento</label>
            </div>

            <div className="col-md-6 form-floating">
              <input
                className="form-control rounded-3 border-secondary-subtle"
                value={form.fabricante}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, fabricante: e.target.value }))
                }
                placeholder="Fabricante"
              />
              <label>Fabricante</label>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6 form-floating">
              <input
                className="form-control rounded-3 border-secondary-subtle"
                value={form.modelo}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, modelo: e.target.value }))
                }
                placeholder="Modelo"
              />
              <label>Modelo</label>
            </div>

            <div className="col-md-6 form-floating">
              <input
                type="number"
                step="0.01"
                className="form-control rounded-3 border-secondary-subtle"
                value={form.potencia_nominal}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    potencia_nominal: e.target.value,
                  }))
                }
                placeholder="Potência nominal"
              />
              <label>Potência nominal</label>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-3 form-floating">
              <input
                type="number"
                step="0.01"
                className="form-control rounded-3 border-secondary-subtle"
                value={form.eficiencia_percent}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    eficiencia_percent: e.target.value,
                  }))
                }
                placeholder="Eficiência (%)"
              />
              <label>Eficiência (%)</label>
            </div>

            <div className="col-md-3 form-floating">
              <input
                type="number"
                className="form-control rounded-3 border-secondary-subtle"
                value={form.ano_fabricacao}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    ano_fabricacao: e.target.value,
                  }))
                }
                placeholder="Ano de fabricação"
              />
              <label>Ano de fabricação</label>
            </div>

            <div className="col-md-3 form-floating">
              <input
                type="number"
                step="0.01"
                className="form-control rounded-3 border-secondary-subtle"
                value={form.valor}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, valor: e.target.value }))
                }
                placeholder="Valor"
              />
              <label>Valor</label>
            </div>

            <div className="col-md-3 form-floating">
              <input
                type="number"
                className="form-control rounded-3 border-secondary-subtle"
                value={form.vida_util_anos}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    vida_util_anos: e.target.value,
                  }))
                }
                placeholder="Vida útil (anos)"
              />
              <label>Vida útil (anos)</label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary py-2 fw-semibold rounded-3 shadow-sm"
          >
            {loading ? "Salvando..." : "Finalizar"}
          </button>
        </form>
      </div>
    </div>
  );
}
