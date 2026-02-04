"use client";

import { useState } from "react";
import AtorForm from "./AtorForm";
import AtorDatalist from "./AtorDatalist";

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

          {/* Toggle Buttons */}
          <div className="btn-group w-100 mb-4">
            <button
              type="button"
              onClick={() => setModo("novo")}
              className={`btn ${
                modo === "novo" ? "btn-primary" : "btn-outline-primary"
              } rounded-3px`}
            >
              Novo Ator
            </button>

            <button
              type="button"
              onClick={() => setModo("existente")}
              className={`btn ${
                modo === "existente"
                  ? "btn-primary"
                  : "btn-outline-primary"
              } rounded-3px`}
            >
              Selecionar Existente
            </button>
          </div>

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

          {modo === "existente" && (
            <AtorDatalist
              onSelected={(atorId) => {
                if (atorId) {
                  onNext(String(atorId));
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
