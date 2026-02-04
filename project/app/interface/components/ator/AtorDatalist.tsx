"use client";

import { useEffect, useState } from "react";

export default function AtorDatalist({
  onSelected,
}: {
  onSelected: (id: string | number) => void;
}) {
  const [atores, setAtores] = useState<
    { id: string | number; nome: string }[]
  >([]);

  const [value, setValue] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/ator");
      const data = await res.json();
      setAtores(data);
    }

    load();
  }, []);

  function handleSelect(nome: string) {
    const ator = atores.find((a) => a.nome === nome);

    if (ator) {
      onSelected(ator.id);
    }
  }

  return (
    <div className="d-flex flex-column gap-3">

      {/* Input com Floating Label */}
      <div className="form-floating">
        <input
          list="atores"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleSelect(e.target.value);
          }}
          placeholder="Buscar ator"
          className="form-control rounded-3px"
        />
        <label>Buscar ator</label>

        {/* Lista */}
        <datalist id="atores">
          {atores.map((a) => (
            <option key={a.id} value={a.nome} />
          ))}
        </datalist>
      </div>

      {/* Texto auxiliar */}
      <small className="text-muted">
        Comece a digitar para filtrar automaticamente.
      </small>

      {/* Botão */}
      <button
        disabled={!value}
        onClick={() => handleSelect(value)}
        className="btn btn-primary py-3 fw-semibold rounded-3px"
      >
        Continuar
      </button>
    </div>
  );
}
