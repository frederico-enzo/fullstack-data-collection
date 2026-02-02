"use client";

import { useState } from "react";
import AtorForm from "./AtorForm";
import AtorSelect from "./AtorSelect";

export default function StepAtor({ onNext }: { onNext: (id: string) => void }) {
    const [modo, setModo] = useState<"novo" | "existente">("novo");

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800">
                Step 1 — Ator
            </h2>

            <p className="text-gray-500 text-sm mt-1">
                Cadastre um novo ator ou selecione um existente.
            </p>

            {/* Toggle Buttons */}
            <div className="flex gap-3 mt-6">
                <button
                    onClick={() => setModo("novo")}
                    className={`flex-1 py-2 rounded-xl font-medium transition ${modo === "novo"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    Novo Ator
                </button>

                <button
                    onClick={() => setModo("existente")}
                    className={`flex-1 py-2 rounded-xl font-medium transition ${modo === "existente"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    Selecionar Existente
                </button>
            </div>

            {/* Conteúdo */}
            <div className="mt-8">
                {modo === "novo" && (
                    <AtorForm onCreated={(ator) => onNext(ator.id)} />
                )}

                {modo === "existente" && (
                    <AtorSelect onSelected={(id) => onNext(id)} />
                )}
            </div>
        </div>
    );
}
