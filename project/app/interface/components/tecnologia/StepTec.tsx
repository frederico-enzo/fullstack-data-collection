"use client";

import type { ComponentType } from "react";
import Fotovoltaica from "./fotovoltaica";
import Biogas from "./biogas";
import PCH from "./pch";
import BESS from "./bess";

interface StepTecProps {
  usinaId: string;
  tecnologia: string;
  onNext: () => void;
}

// Cast imports to typed component types so props are accepted
const FotovoltaicaComp = Fotovoltaica as ComponentType<{
  usinaId: string;
  onNext: () => void;
}>;
const BiogasComp = Biogas as ComponentType<{
  usinaId: string;
  onNext: () => void;
}>;
const PCHComp = PCH as ComponentType<{ usinaId: string; onNext: () => void }>;
const BESSComp = BESS as ComponentType<{ usinaId: string; onNext: () => void }>;

export default function StepTecn({
  usinaId,
  tecnologia,
  onNext,
}: StepTecProps) {
  switch (tecnologia) {
    case "FOTOVOLTAICA":
      return <FotovoltaicaComp usinaId={usinaId} onNext={onNext} />;
    case "BIOGAS":
      return <BiogasComp usinaId={usinaId} onNext={onNext} />;
    case "PCH":
      return <PCHComp usinaId={usinaId} onNext={onNext} />;
    case "ARMAZENAMENTO":
      return <BESSComp usinaId={usinaId} onNext={onNext} />;
    default:
      return (
        <div className="container py-3 py-md-4">
          <div
            className="alert alert-warning border-0 shadow-sm mx-auto rounded-4 mb-0"
            style={{ maxWidth: "720px", width: "100%" }}
          >
            Tecnologia inválida para esta usina.
          </div>
        </div>
      );
  }
}
