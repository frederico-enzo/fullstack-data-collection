"use client";

import { useEffect, type ComponentType } from "react";
import Fotovoltaica from "./fotovoltaica";
import Biogas from "./biogas";
import PCH from "./pch";
import BESS from "./bess";
import { useGlobalToast } from "@/app/components/GlobalToastProvider";

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
  const notify = useGlobalToast();

  useEffect(() => {
    const validTecnologias = ["FOTOVOLTAICA", "BIOGAS", "PCH", "ARMAZENAMENTO"];

    if (!validTecnologias.includes(tecnologia)) {
      notify("Tecnologia inválida para esta usina.", "warning");
    }
  }, [notify, tecnologia]);

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
            className="border border-warning-subtle bg-warning-subtle text-warning-emphasis shadow-sm mx-auto rounded-4 mb-0 p-3"
            style={{ maxWidth: "720px", width: "100%" }}
          >
            Tecnologia inválida para esta usina.
          </div>
        </div>
      );
  }
}
