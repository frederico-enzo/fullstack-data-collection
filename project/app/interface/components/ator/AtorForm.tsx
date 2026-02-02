"use client";

import { useState } from "react";

interface AtorFormProps {
    onCreated: (ator: any) => void;
}



export default function AtorForm({ onCreated }: AtorFormProps) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nome: "",
        telefone: "",
        email: "",
        cnpj_cpf: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/ator", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        // ✅ Se deu erro, mostrar mensagem e parar
        if (!res.ok) {
            const err = await res.json();
            alert(err.error);
            setLoading(false);
            return;
        }

        // ✅ Só continua se deu certo
        const ator = await res.json();
        setLoading(false);

        onCreated(ator);
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Nome *
                </label>
                <input
                    required
                    value={form.nome}
                    onChange={(e) =>
                        setForm({ ...form, nome: e.target.value })
                    }
                    placeholder="Nome do ator"
                    className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-200 outline-none"
                />
            </div>

            {/* Telefone */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Telefone
                </label>
                <input
                    value={form.telefone}
                    onChange={(e) =>
                        setForm({ ...form, telefone: e.target.value })
                    }
                    placeholder="(99) 99999-9999"
                    className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-200 outline-none"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    placeholder="email@exemplo.com"
                    className="w-full  mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-200 outline-none"
                />
            </div>

            {/* CPF/CNPJ */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    CPF/CNPJ
                </label>
                <input
                    value={form.cnpj_cpf}
                    onChange={(e) =>
                        setForm({ ...form, cnpj_cpf: e.target.value })
                    }
                    placeholder="000.000.000-00"
                    className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-200 outline-none"
                />
            </div>

            {/* Botão */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
                {loading ? "Salvando..." : "Salvar e continuar"}
            </button>
        </form>
    );
}
