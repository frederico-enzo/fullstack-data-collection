
import { useState } from "react";

type StepTecnologiaProps = {
    atorId: string;
    onNext?: (id: string) => void;
};

export default function StepTecnologia({ atorId, onNext }: StepTecnologiaProps) {

    return (

        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
            {/* Header */}

            <div>
                {/* ... */}
                <p>Ator ID: {atorId}</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Step 1 — Tecnologia</h2>

            <p className="text-gray-500 text-sm mt-1">
                Cadastre uma nova tecnologia ou selecione uma existente.
            </p>
        </div>
    );
}
