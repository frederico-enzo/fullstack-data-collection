"use client";

import { useState } from "react";
import StepAtor from "../components/ator/StepAtor";
import StepTecnologia from "../components/tecnologia/StepTecnologia";
import StepGeradora from "../components/geradora/StepGeradora";

export default function FormularioPage() {
    const [step, setStep] = useState<"ator" | "tecnologia" | "geradora">("ator");
    const [atorId, setAtorId] = useState<string | null>(null);

    return (
        <div>
            {/* STEP 1 */}
            {step === "ator" && (
                <StepAtor
                    onNext={(id) => {
                        setAtorId(id);              // salva o ator
                        setStep("geradora");      // avança para o próximo step
                    }}
                />
            )}

            {/* STEP 2 */}
            {step === "geradora" && atorId && (
                <StepGeradora atorId={atorId} />
            )}
        </div>
    );
}
