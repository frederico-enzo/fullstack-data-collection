"use client";

import { useState } from "react";
import AtorForm from "./AtorForm";

interface StepAtorProps {
  onNext: (id: string) => void;
}

export default function StepAtor({ onNext }: StepAtorProps) {
  const [modo, setModo] = useState<"novo" | "existente">("novo");

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm mx-auto rounded-3px"
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body p-4">
          {/* Header */}
          <h2 className="fw-bold mb-1">Step 1 — Ator</h2>

          <p className="text-muted mb-4">
            Cadastre um novo ator ou selecione um existente.
          </p>
          {/* Conteúdo */}
          {modo === "novo" && (
            <AtorForm
              onCreated={(ator) => {
                if (ator?.id) {
                  onNext(String(ator.id));
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
