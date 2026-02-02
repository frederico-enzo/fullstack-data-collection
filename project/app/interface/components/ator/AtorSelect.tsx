"use client";

import { useEffect, useState } from "react";

export default function AtorSelect({ onSelected }: { onSelected: (id: string) => void }) {
    const [atores, setAtores] = useState<{ id: string; nome: string }[]>([]);
    const [id, setId] = useState("");

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/ator");
            const data = await res.json();
            setAtores(data);
        }

        load();
    }, []);

    return (
        <div className="space-y-4">
            <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
                <option value="">Selecione um ator...</option>

                {atores.map((a) => (
                    <option key={a.id} value={a.id}>
                        {a.nome}
                    </option>
                ))}
            </select>

            <button
                disabled={!id}
                onClick={() => onSelected(id)}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Continuar
            </button>
        </div>
    );
}
