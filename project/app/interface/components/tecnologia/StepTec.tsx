"use client";

import type { ComponentType } from "react";
import Fotovoltaica from "./fotovoltaica";
import Biogas from "./biogas";
import PCH from "./pch";
import BESS from "./bess";

// ...existing code...
interface StepTecProps {
  usinaId: string;
  tecnologia: string;
}

// Cast imports to typed component types so props are accepted
const FotovoltaicaComp = Fotovoltaica as ComponentType<{ usinaId: string }>;
const BiogasComp = Biogas as ComponentType<{ usinaId: string }>;
const PCHComp = PCH as ComponentType<{ usinaId: string }>;
const BESSComp = BESS as ComponentType<{ usinaId: string }>;

export default function StepTecn({
  usinaId,
  tecnologia,
}: StepTecProps) {
  switch (tecnologia) {
    case "FOTOVOLTAICA":
      return <FotovoltaicaComp usinaId={usinaId} />;
    case "BIOGAS":
      return <BiogasComp usinaId={usinaId} />;
    case "PCH":
      return <PCHComp usinaId={usinaId} />;
    case "ARMAZENAMENTO":
      return <BESSComp usinaId={usinaId} />;
    default:
      return <div>Tecnologia inválida</div>;
  }
}
// ...existing code...