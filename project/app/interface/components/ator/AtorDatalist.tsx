"use client";

import { useEffect, useState } from "react";

export default function AtorDatalist({ onSelected }: { onSelected: (id: string | number) => void }) {
    const [atores, setAtores] = useState<{ id: string | number; nome: string }[]>([]);
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
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                Buscar ator
            </label>

            <input
                list="atores"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    handleSelect(e.target.value);
                }}
                placeholder="Digite o nome do ator..."
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-200 outline-none"
            />

            <datalist id="atores">
                {atores.map((a) => (
                    <option key={a.id} value={a.nome} />
                ))}
            </datalist>

            <p className="text-sm text-gray-500">
                Comece a digitar para filtrar automaticamente.
            </p>

            <button
                disabled={!value}
                onClick={() => handleSelect(value)}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Continuar
            </button>
        </div>
    );
}
