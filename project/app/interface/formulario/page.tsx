"use client";

import { useEffect, useState } from "react";
import StepAtor from "../components/ator/StepAtor";
import StepGeradora from "../components/geradora/StepGeradora";
import StepTecnologia from "../components/tecnologia/StepTec";
import StepEquipamento from "../components/equipamento/StepEquipamento";

type StepKey = "ator" | "geradora" | "tecnologia" | "equipamento" | "revisao";
type AnyData = Record<string, unknown>;

const STEP_ORDER: StepKey[] = [
  "ator",
  "geradora",
  "tecnologia",
  "equipamento",
  "revisao",
];

const STEP_LABELS: Record<StepKey, string> = {
  ator: "Ator",
  geradora: "Geradora",
  tecnologia: "Tecnologia",
  equipamento: "Equipamento",
  revisao: "Revisão",
};

function formatLabel(key: string) {
  return key
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function DataSection({
  title,
  data,
}: {
  title: string;
  data: AnyData | null | undefined;
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4">
        <h3 className="h6 fw-bold mb-3">{title}</h3>
        {!data ? (
          <p className="text-muted mb-0">Sem dados.</p>
        ) : (
          <div className="row g-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="col-md-6">
                <div className="border rounded-3 p-3 h-100">
                  <p className="small text-muted mb-1">{formatLabel(key)}</p>
                  <p className="mb-0 fw-semibold text-break">
                    {renderValue(value)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FormularioPage() {
  const [step, setStep] = useState<StepKey>("ator");
  const [maxUnlockedStepIndex, setMaxUnlockedStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const [atorId, setAtorId] = useState<string | null>(null);
  const [usinaId, setUsinaId] = useState<string | null>(null);
  const [tecnologia, setTecnologia] = useState<string | null>(null);
  const [equipamentoId, setEquipamentoId] = useState<string | null>(null);

  const [reviewData, setReviewData] = useState<{
    ator?: AnyData | null;
    geradora?: AnyData | null;
    tecnologia?: AnyData | null;
    equipamentos?: AnyData[] | null;
  } | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const currentStepIndex = STEP_ORDER.indexOf(step);
  const progressPercent = ((currentStepIndex + 1) / STEP_ORDER.length) * 100;

  function goToStep(nextStep: StepKey) {
    const nextIndex = STEP_ORDER.indexOf(nextStep);
    setStep(nextStep);
    setMaxUnlockedStepIndex((prev) => Math.max(prev, nextIndex));
  }

  function goToUnlockedStep(target: StepKey) {
    const targetIndex = STEP_ORDER.indexOf(target);
    if (targetIndex <= maxUnlockedStepIndex) {
      if (target === "revisao") {
        setReviewLoading(true);
        setReviewError(null);
      }
      setStep(target);
    }
  }

  useEffect(() => {
    if (step !== "revisao" || !atorId || !usinaId) return;

    let mounted = true;

    fetch(`/api/revisao?ator_id=${atorId}&usina_id=${usinaId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Não foi possível carregar a revisão.");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setReviewData(data);
      })
      .catch((error) => {
        if (!mounted) return;
        setReviewError(error instanceof Error ? error.message : "Erro inesperado.");
      })
      .finally(() => {
        if (!mounted) return;
        setReviewLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [step, atorId, usinaId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 10% 10%, #f7f2e8 0%, #eef3fb 40%, #f8fbff 100%)",
      }}
      className="py-4 py-md-5"
    >
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="bg-white border rounded-4 shadow-sm p-3 p-md-4 mb-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <p className="text-uppercase text-muted fw-semibold small mb-1">
                Cadastro da Unidade
              </p>
              <h1 className="h4 mb-0 fw-bold">Formulário Multietapas</h1>
            </div>
          </div>

          <div className="progress mb-3" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progressPercent}%`,
                background:
                  "linear-gradient(90deg, #0b7285 0%, #1971c2 50%, #2b8a3e 100%)",
              }}
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <div className="d-flex flex-wrap gap-2">
            {STEP_ORDER.map((stepKey, index) => {
              const isActive = stepKey === step;
              const isUnlocked = index <= maxUnlockedStepIndex;
              return (
                <button
                  key={stepKey}
                  type="button"
                  onClick={() => goToUnlockedStep(stepKey)}
                  disabled={!isUnlocked}
                  className={`btn rounded-pill px-3 py-1 ${
                    isActive
                      ? "btn-primary"
                      : isUnlocked
                        ? "btn-outline-primary"
                        : "btn-outline-secondary"
                  }`}
                >
                  {index + 1}. {STEP_LABELS[stepKey]}
                </button>
              );
            })}
          </div>
        </div>

        <div className={step === "ator" ? "d-block" : "d-none"}>
          <StepAtor
            onAtorSelect={(id) => {
              setFinished(false);
              setAtorId(id);
              setUsinaId(null);
              setTecnologia(null);
              setEquipamentoId(null);
              setReviewData(null);
              goToStep("geradora");
            }}
          />
        </div>

        <div className={step === "geradora" ? "d-block" : "d-none"}>
          {atorId && (
            <StepGeradora
              atorId={atorId}
              onNext={(uId, tech) => {
                setFinished(false);
                setUsinaId(uId);
                setTecnologia(tech);
                setEquipamentoId(null);
                setReviewData(null);
                goToStep("tecnologia");
              }}
            />
          )}
        </div>

        <div className={step === "tecnologia" ? "d-block" : "d-none"}>
          {usinaId && tecnologia && (
            <StepTecnologia
              usinaId={usinaId}
              tecnologia={tecnologia}
              onNext={() => {
                setFinished(false);
                setReviewData(null);
                goToStep("equipamento");
              }}
            />
          )}
        </div>

        <div className={step === "equipamento" ? "d-block" : "d-none"}>
          {usinaId && (
            <StepEquipamento
              usinaId={usinaId}
              equipamentoId={equipamentoId}
              onSaved={(id) => setEquipamentoId(id)}
              onNext={() => {
                setFinished(false);
                setReviewData(null);
                setReviewLoading(true);
                setReviewError(null);
                goToStep("revisao");
              }}
            />
          )}
        </div>

        <div className={step === "revisao" ? "d-block" : "d-none"}>
          <div
            className="card border-0 shadow-sm rounded-4 mx-auto"
            style={{ maxWidth: "1000px", minHeight: "760px" }}
          >
            <div className="card-body p-4 p-md-5">
              <span className="badge text-bg-success mb-2">Etapa 5 de 5</span>
              <h2 className="h4 fw-bold mb-2">Revisão Completa</h2>
              <p className="text-muted mb-4">
                Confira todas as informações salvas antes de finalizar.
              </p>

              {reviewLoading && (
                <div className="alert alert-info">Carregando dados da revisão...</div>
              )}

              {reviewError && (
                <div className="alert alert-danger">{reviewError}</div>
              )}

              {!reviewLoading && !reviewError && (
                <div className="d-flex flex-column gap-3 mb-4">
                  <DataSection title="Ator" data={reviewData?.ator} />
                  <DataSection title="Geradora" data={reviewData?.geradora} />
                  <DataSection title="Tecnologia" data={reviewData?.tecnologia} />
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <h3 className="h6 fw-bold mb-3">Equipamentos</h3>
                      {(reviewData?.equipamentos?.length || 0) === 0 ? (
                        <p className="text-muted mb-0">Sem equipamentos.</p>
                      ) : (
                        <div className="d-flex flex-column gap-3">
                          {reviewData?.equipamentos?.map((item, index) => (
                            <DataSection
                              key={`equip-${index}`}
                              title={`Equipamento ${index + 1}`}
                              data={item}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex flex-wrap gap-2 mb-4">
                <button
                  type="button"
                  className="btn btn-outline-primary rounded-pill"
                  onClick={() => setStep("ator")}
                >
                  Editar Ator
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary rounded-pill"
                  onClick={() => setStep("geradora")}
                >
                  Editar Geradora
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary rounded-pill"
                  onClick={() => setStep("tecnologia")}
                >
                  Editar Tecnologia
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary rounded-pill"
                  onClick={() => setStep("equipamento")}
                >
                  Editar Equipamento
                </button>
              </div>

              <button
                type="button"
                className="btn btn-success rounded-3 px-4"
                onClick={() => setFinished(true)}
              >
                Finalizar cadastro
              </button>

              {finished && (
                <div className="alert alert-success mt-3 mb-0">
                  Cadastro finalizado com sucesso.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
