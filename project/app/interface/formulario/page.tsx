"use client";

import { useState } from "react";
import StepAtor from "../components/ator/StepAtor";
import StepTecnologia from "../components/tecnologia/StepTecnologia";

export default function FormularioPage() {
    const [step, setStep] = useState<"ator" | "tecnologia">("ator");
    const [atorId, setAtorId] = useState<string | null>(null);

    return (
        <div>
            {/* STEP 1 */}
            {step === "ator" && (
                <StepAtor
                    onNext={(id) => {
                        setAtorId(id);              // salva o ator
                        setStep("tecnologia");      // avança para o próximo step
                    }}
                />
            )}

            {/* STEP 2 */}
            {step === "tecnologia" && atorId && (
                <StepTecnologia atorId={atorId} />
            )}
        </div>
    );
}
