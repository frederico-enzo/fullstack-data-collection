"use client";

import { useState } from "react";
import StepAtor  from "../components/ator/StepAtor";
import StepGeradora from "../components/geradora/StepGeradora";
import StepTecnologia from "../components/tecnologia/StepTec";
import StepEquipamento from "../components/equipamento/StepEquipamento";

export default function FormularioPage() {
  const [step, setStep] = useState<
    "ator" | "geradora" | "tecnologia" | "equipamento"
  >("ator");

  const [atorId, setAtorId] = useState<string | null>(null);
  const [usinaId, setUsinaId] = useState<string | null>(null);
  const [tecnologia, setTecnologia] = useState<string | null>(null);

  return (
    <div>
      {/* STEP 1 — ATOR */}
      {step === "ator" && (
        <StepAtor
          onAtorSelect={(id) => {
            setAtorId(id);
            setStep("geradora");
          }}
        />
      )}

      {/* STEP 2 — GERADORA */}
      {step === "geradora" && atorId && (
        <StepGeradora
          atorId={atorId}
          onNext={(uId, tech) => {
            setUsinaId(uId);
            setTecnologia(tech);
            setStep("tecnologia");
          }}
        />
      )}

      {/* STEP 3 — TECNOLOGIA */}
      {step === "tecnologia" && usinaId && tecnologia && (
        <StepTecnologia
          usinaId={usinaId}
          tecnologia={tecnologia}
          onNext={() => setStep("equipamento")}
        />
      )}

      {/* STEP 4 — EQUIPAMENTO */}
      {step === "equipamento" && usinaId && (
        <StepEquipamento usinaId={usinaId} />
      )}
    </div>
  );
}
