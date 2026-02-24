"use client";

import { useEffect, useState } from "react";
import StepAtor from "../components/ator/StepAtor";
import StepGeradora from "../components/geradora/StepGeradora";
import StepTecnologia from "../components/tecnologia/StepTec";
import StepEquipamento from "../components/equipamento/StepEquipamento";

type StepKey = "ator" | "geradora" | "tecnologia" | "equipamento" | "revisao";
type AnyData = Record<string, unknown>;
type DataGroup = { title: string; rows: string[][] };

const INTERNAL_KEYS = new Set([
  "id",
  "ator_id",
  "geradora_id",
  "usina_id",
  "equipamento_id",
  "municipio_id",
  "data_inicio_coleta",
]);

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

function renderValue(key: string, value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") {
    if (key.toLowerCase() === "municipio") {
      const nome = (value as { nome?: unknown }).nome;
      if (typeof nome === "string" && nome.trim() !== "") return nome;
    }
    return "—";
  }
  return String(value);
}

function detectTecnologiaTipo(data: AnyData): string | null {
  if ("area_ocupada_m2" in data || "tipo_modulo" in data) return "FOTOVOLTAICA";
  if ("tipo_substrato" in data || "tipo_biodigestor" in data) return "BIOGAS";
  if ("rio_aproveitado" in data || "tipo_turbina" in data) return "PCH";
  if ("tecnologia_bateria" in data || "quantidade_modulos" in data) return "ARMAZENAMENTO";
  return null;
}

function getGroups(title: string, data: AnyData | null | undefined): DataGroup[] {
  if (!data) return [];

  if (title === "Ator") {
    return [
      { title: "Identificação", rows: [["nome", "cnpj_cpf"]] },
      { title: "Contato", rows: [["telefone", "email"]] },
    ];
  }

  if (title === "Geradora") {
    return [
      {
        title: "Dados Gerais",
        rows: [["tecnologia", "municipio", "data_inicio_operacao"]],
      },
      { title: "Comercial", rows: [["tipo_comprador", "tipo_contrato"]] },
      {
        title: "Indicadores",
        rows: [
          [
            "media_energia_gerada_mensal",
            "capacidade_total_instalada",
            "media_volume_vendido_mensal",
            "media_reducao_co2_mensal",
          ],
        ],
      },
    ];
  }

  if (title === "Equipamentos" || title.startsWith("Equipamento")) {
    return [
      {
        title: "Identificação",
        rows: [["tipo_equipamento", "fabricante"], ["modelo", "ano_fabricacao"]],
      },
      {
        title: "Desempenho",
        rows: [["potencia_nominal", "eficiencia_percent"], ["vida_util_anos", "valor"]],
      },
    ];
  }

  if (title === "Tecnologia") {
    const tipo = detectTecnologiaTipo(data);
    if (tipo === "FOTOVOLTAICA") {
      return [
        {
          title: "Área e Módulos",
          rows: [
            ["area_ocupada_m2", "numero_modulos"],
            ["tipo_modulo", "potencia_unitaria_modulo_w"],
          ],
        },
        {
          title: "Inversores",
          rows: [["tipo_inversor", "quantidade_inversores"]],
        },
        {
          title: "Condições Elétricas e Ambientais",
          rows: [
            ["tensao_nominal_sistema_v", "irradiacao_media_kwh_m2_ano"],
            ["temperatura_media_operacao_c", "inclinacao_graus", "orientacao_modulos"],
          ],
        },
        {
          title: "Uso do Solo",
          rows: [["area_desmatada_ha", "area_reaproveitada_ha"]],
        },
        { title: "Conexão", rows: [["tipo_conexao", "fase"]] },
      ];
    }

    if (tipo === "BIOGAS") {
      return [
        {
          title: "Processo",
          rows: [
            ["tipo_substrato", "tipo_biodigestor"],
            ["quantidade_processada_t_dia", "tratamento_biogas"],
            ["equipamento_conversao"],
          ],
        },
        {
          title: "Eficiências",
          rows: [["eficiencia_eletrica_percent", "eficiencia_termica_percent", "teor_solidos_percent"]],
        },
        {
          title: "Operação e Ambiental",
          rows: [
            ["sistema_queima_excedente"],
            ["producao_biogas_nm3_dia", "pressao_media_bar", "temperatura_media_c"],
            ["destinacao_digestato"],
          ],
        },
      ];
    }

    if (tipo === "PCH") {
      return [
        {
          title: "Hidrologia",
          rows: [
            ["rio_aproveitado", "tipo_turbina"],
            ["vazao_media_m3s", "vazao_turbinada_m3s", "queda_bruta_m", "queda_liquida_m"],
          ],
        },
        {
          title: "Turbinas",
          rows: [
            ["numero_turbinas", "potencia_unitaria_turbina_mw", "tipo_gerador"],
          ],
        },
        {
          title: "Rendimentos",
          rows: [["rendimento_turbina_percent", "rendimento_gerador_percent", "eficiencia_global_percent"]],
        },
        {
          title: "Conexão Elétrica",
          rows: [
            ["tensao_nominal_sistema_kv", "sistema_regulacao"],
            ["nivel_tensao_conexao", "subestacao_conexao", "distribuidora_vinculada"],
          ],
        },
      ];
    }

    if (tipo === "ARMAZENAMENTO") {
      return [
        {
          title: "Bateria",
          rows: [
            ["temperatura_operacao_c", "tecnologia_bateria", "fabricante_bateria"],
            ["quantidade_modulos", "capacidade_unitaria_kwh"],
          ],
        },
        {
          title: "Elétrico",
          rows: [
            ["tensao_nominal_sistema_v", "corrente_nominal_a", "profundidade_descarga_percent"],
            ["vida_util_ciclos", "tempo_recarga_horas", "eficiencia_conversao_percent"],
          ],
        },
        {
          title: "Operação e Conexão",
          rows: [
            ["sistema_gerenciamento_bms", "sistema_conversao_potencia"],
            ["modalidade_operacao", "tipo_conexao", "nivel_tensao_conexao"],
            ["fator_capacidade_percent"],
          ],
        },
      ];
    }
  }

  return [];
}

function DataSection({
  title,
  data,
}: {
  title: string;
  data: AnyData | null | undefined;
}) {
  const entries = data
    ? Object.entries(data).filter(([key]) => {
      const normalizedKey = key.toLowerCase();
      if (INTERNAL_KEYS.has(normalizedKey)) return false;
      if (title !== "Geradora") return true;
      return !["fotovoltaico", "biogas", "pch", "armazenamento"].includes(normalizedKey);
    })
    : [];
  const groups = getGroups(title, data ?? undefined);
  const entriesMap = new Map(entries);
  const structuredRows = groups
    .flatMap((group) => group.rows)
    .map((row) =>
      row
        .filter((key) => entriesMap.has(key))
        .map((key) => [key, entriesMap.get(key)] as const)
    )
    .filter((row) => row.length > 0);
  const orderedSet = new Set(structuredRows.flatMap((row) => row.map(([key]) => key)));
  const remainingEntries = entries.filter(([key]) => !orderedSet.has(key));
  const rows: Array<Array<(typeof entries)[number]>> = structuredRows.map(row =>
    row.map(([k, v]) => [k, v] as [string, unknown])
  );

  for (let i = 0; i < remainingEntries.length; i += 2) {
    rows.push(remainingEntries.slice(i, i + 2));
  }
  const balancedRows = rows.map((row) => [...row]);

  // Avoid single-field rows by merging them with adjacent rows when possible.
  for (let i = 0; i < balancedRows.length; i += 1) {
    if (balancedRows[i].length !== 1) continue;

    const singleItem = balancedRows[i][0];

    if (i > 0 && balancedRows[i - 1].length < 3) {
      balancedRows[i - 1].push(singleItem);
      balancedRows.splice(i, 1);
      i -= 1;
      continue;
    }

    if (i + 1 < balancedRows.length && balancedRows[i + 1].length < 3) {
      balancedRows[i + 1].unshift(singleItem);
      balancedRows.splice(i, 1);
      i -= 1;
    }
  }

  return (
    <div className="card border shadow-sm rounded-4 h-100 bg-body-tertiary">
      <div className="card-body p-3">
        <h3 className="small fw-bold text-uppercase text-secondary mb-2">
          {title}
        </h3>
        {!data || balancedRows.length === 0 ? (
          <p className="small text-muted mb-0">Sem dados.</p>
        ) : (
          <div className="d-flex flex-column gap-2">
            {balancedRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="row g-2">
                {row.map(([key, value]) => (
                  <div key={key} className={row.length === 3 ? "col-md-4" : "col-md-6"}>
                    <div className="border rounded-3 p-2 h-100">
                      <p className="small text-secondary text-uppercase mb-1">
                        {formatLabel(key)}
                      </p>
                      <p className="small mb-0 fw-semibold text-break">
                        {renderValue(key, value)}
                      </p>
                    </div>
                  </div>
                ))}
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
          "radial-gradient(circle at 10% 10%, #fffaf0 0%, #f7f6f2 44%, #f1eee6 100%)",
      }}
      className="py-4 py-md-5"
    >
      <div className="container" style={{ maxWidth: "960px" }}>
        <div className="bg-body-tertiary border rounded-4 shadow-sm p-3 p-md-4 mb-4">
          <div className="mb-3 text-center">
            <h1 className="h6 mb-0 fw-bold text-uppercase">Cadastro da Unidade</h1>
          </div>

          <div className="progress mb-3" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progressPercent}%`,
                background:
                  "linear-gradient(90deg, #16a34a 0%, #22c55e 55%, #4ade80 100%)",
              }}
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-2">
            {STEP_ORDER.map((stepKey, index) => {
              const isActive = stepKey === step;
              const isUnlocked = index <= maxUnlockedStepIndex;
              return (
                <button
                  key={stepKey}
                  type="button"
                  onClick={() => goToUnlockedStep(stepKey)}
                  disabled={!isUnlocked}
                  className={`btn px-3 py-1 ${isActive
                    ? "btn-primary"
                    : isUnlocked
                      ? "btn-outline-primary"
                      : "btn-outline-secondary"
                    }`}
                >
                  {STEP_LABELS[stepKey]}
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
            style={{ maxWidth: "960px", width: "100%" }}
          >
            <div className="card-body p-3 p-md-4">
              {reviewLoading && (
                <div className="alert alert-secondary">Carregando dados da revisão...</div>
              )}

              {reviewError && (
                <div className="alert alert-danger">{reviewError}</div>
              )}

              {!reviewLoading && !reviewError && (
                <div className="d-flex flex-column gap-3 mb-4">
                  <DataSection title="Ator" data={reviewData?.ator} />
                  <DataSection title="Geradora" data={reviewData?.geradora} />
                  <DataSection title="Tecnologia" data={reviewData?.tecnologia} />
                  <div className="card border shadow-sm rounded-4 bg-body-tertiary">
                    <div className="card-body p-3">
                      <h3 className="small fw-bold text-uppercase text-secondary mb-2">
                        Equipamentos
                      </h3>
                      {(reviewData?.equipamentos?.length || 0) === 0 ? (
                        <p className="small text-muted mb-0">Sem equipamentos.</p>
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

              <button
                type="button"
                className="btn btn-success px-4"
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
