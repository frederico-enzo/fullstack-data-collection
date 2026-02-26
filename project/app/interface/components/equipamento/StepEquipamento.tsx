"use client";

import { useCallback, useEffect, useState } from "react";
import { useGlobalToast } from "@/app/components/GlobalToastProvider";

interface StepEquipamentoProps {
  usinaId: string;
  onNext: () => void;
}

interface ExistingEquipamento {
  id: string;
  tipo_equipamento: string | null;
  fabricante: string | null;
  modelo: string | null;
  ano_fabricacao: number | null;
}

const INITIAL_FORM = {
  tipo_equipamento: "",
  fabricante: "",
  modelo: "",
  potencia_nominal: "",
  eficiencia_percent: "",
  ano_fabricacao: "",
  valor: "",
  vida_util_anos: "",
};

export default function StepEquipamento({
  usinaId,
  onNext,
}: StepEquipamentoProps) {
  const notify = useGlobalToast();
  const [loadingMode, setLoadingMode] = useState<"add" | "review" | "link" | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [existingEquipamentos, setExistingEquipamentos] = useState<
    ExistingEquipamento[]
  >([]);
  const [selectedExistingId, setSelectedExistingId] = useState("");
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [existingError, setExistingError] = useState<string | null>(null);

  const toNumberOrNull = (value: string) =>
    value.trim() === "" ? null : Number(value);

  const toStringOrNull = (value: string) => {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  };
  const hasFormData = Object.values(form).some((value) => value.trim() !== "");

  function formatExistingLabel(item: ExistingEquipamento) {
    const main = [
      item.tipo_equipamento || "Sem tipo",
      item.fabricante || "Sem fabricante",
      item.modelo || "Sem modelo",
    ].join(" | ");

    return item.ano_fabricacao ? `${main} (${item.ano_fabricacao})` : main;
  }

  const loadExistingEquipamentos = useCallback(async () => {
    setLoadingExisting(true);
    setExistingError(null);
    try {
      const query = new URLSearchParams();
      query.set("limit", "30");
      query.set("usina_id", usinaId);

      const res = await fetch(`/api/equipamento?${query.toString()}`);
      if (!res.ok) {
        throw new Error();
      }

      const data: ExistingEquipamento[] = await res.json();
      setExistingEquipamentos(data);
    } catch {
      const message = "Erro ao carregar equipamentos existentes.";
      setExistingError(message);
      notify(message, "error");
    } finally {
      setLoadingExisting(false);
    }
  }, [notify, usinaId]);

  useEffect(() => {
    void loadExistingEquipamentos();
    setSelectedExistingId("");
  }, [loadExistingEquipamentos]);

  async function handleLinkExisting() {
    if (!selectedExistingId) {
      notify("Selecione um equipamento já cadastrado.", "warning");
      return;
    }

    const equipamentoId = selectedExistingId;
    setLoadingMode("link");
    try {
      const res = await fetch("/api/equipamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usina_id: usinaId,
          equipamento_id: equipamentoId,
          vincular_existente: true,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      await res.json();
      setSavedCount((current) => current + 1);
      setSelectedExistingId("");
      await loadExistingEquipamentos();
      notify("Equipamento existente vinculado com sucesso.", "success");
    } catch {
      notify("Erro ao vincular equipamento existente", "error");
    } finally {
      setLoadingMode(null);
    }
  }

  async function handleSave(mode: "add" | "review") {
    setLoadingMode(mode);

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

      await res.json();
      setSavedCount((current) => current + 1);

      if (mode === "add") {
        setForm(INITIAL_FORM);
        notify("Equipamento salvo. Preencha o próximo.", "success");
      } else {
        notify("Equipamento salvo e vinculado à geradora com sucesso", "success");
        onNext();
      }
    } catch {
      notify("Erro ao salvar equipamento", "error");
    } finally {
      setLoadingMode(null);
    }
  }

  async function handleAdvance() {
    if (hasFormData) {
      await handleSave("review");
      return;
    }

    if (savedCount > 0) {
      onNext();
      return;
    }

    notify("Cadastre ou vincule ao menos um equipamento para avançar.", "warning");
  }

  return (
    <div className="container py-3 py-md-4">
      <div
        className="card border-0 shadow-sm mx-auto rounded-4"
        style={{ maxWidth: "960px", width: "100%" }}
      >
        <form
          className="d-flex flex-column gap-3 gap-md-4 p-3 p-md-4 border rounded-4 bg-body-tertiary shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
            <h2 className="h6 mb-0 fw-bold text-uppercase">Equipamentos</h2>
            <div className="bg-light border rounded-3 mb-0 py-2 px-3 small text-secondary">
              Total cadastrado nesta etapa: <strong>{savedCount}</strong>
            </div>
          </div>

          <div className="card border rounded-3 bg-white">
            <div className="card-body p-3 d-flex flex-column gap-2">
              <h3 className="h6 mb-0">Vincular equipamento existente</h3>
              <div className="small text-muted">
                {loadingExisting
                  ? "Atualizando lista de equipamentos..."
                  : `${existingEquipamentos.length} equipamento(s) encontrado(s).`}
              </div>
              {existingError && <div className="small text-danger">{existingError}</div>}
              <div className="d-flex flex-column flex-md-row gap-2">
                <select
                  className="form-select"
                  value={selectedExistingId}
                  onChange={(e) => setSelectedExistingId(e.target.value)}
                >
                  <option value="">Selecione um equipamento</option>
                  {existingEquipamentos.map((item) => (
                    <option key={item.id} value={item.id}>
                      {formatExistingLabel(item)}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  disabled={loadingMode !== null || !selectedExistingId}
                  onClick={handleLinkExisting}
                >
                  {loadingMode === "link"
                    ? "Vinculando..."
                    : "Vincular"}
                </button>
              </div>
            </div>
          </div>

          <div className="card border rounded-3 bg-white">
            <div className="card-body p-3 d-flex flex-column gap-3">
              <h3 className="h6 mb-0">Cadastro de novo equipamento</h3>

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

              <div className="d-flex flex-column flex-md-row justify-content-end gap-2">
                <button
                  type="button"
                  disabled={loadingMode !== null}
                  onClick={() => handleSave("add")}
                  className="btn btn-outline-primary py-2 px-3 fw-semibold rounded-3 shadow-sm"
                >
                  {loadingMode === "add"
                    ? "Salvando..."
                    : "Cadastrar"}
                </button>
                <button
                  type="button"
                  disabled={loadingMode !== null}
                  onClick={() => void handleAdvance()}
                  className="btn btn-primary py-2 px-3 fw-semibold rounded-3 shadow-sm"
                >
                  {loadingMode === "review"
                    ? "Salvando..."
                    : "Avançar"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
