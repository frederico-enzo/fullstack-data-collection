"use client";

import AtorForm from "./AtorForm";

interface StepAtorProps {
  onNext: (id: string) => void;
}

export default function StepAtor({ onNext }: StepAtorProps) {
  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-sm mx-auto rounded-4"
        style={{ maxWidth: "640px" }}
      >
        {/* Header */}
        <div className="card-header bg-white border-0 pb-0 pt-4 px-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Etapa 1 de 4
          </span>

          <h2 className="fw-bold mb-1">Cadastro do Ator</h2>
          <p className="text-muted mb-0">
            Informe quem é o responsável pela unidade geradora.
          </p>
        </div>

        {/* Body */}
        <div className="card-body px-4 pt-4 pb-5">
          <AtorForm
            onCreated={(ator) => {
              if (ator?.id) {
                onNext(String(ator.id));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
