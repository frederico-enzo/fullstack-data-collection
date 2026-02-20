"use client";

import { useState } from "react";

interface BiogasProps {
    usinaId: string;
}

export default function Biogas({ usinaId }: BiogasProps) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        tipo_substrato: "",
        quantidade_processada_t_dia: "",
        teor_solidos_percent: "",
        tipo_biodigestor: "",
        tratamento_biogas: "",
        equipamento_conversao: "",
        eficiencia_eletrica_percent: "",
        eficiencia_termica_percent: "",
        sistema_queima_excedente: "",
        producao_biogas_nm3_dia: "",
        pressao_media_bar: "",
        temperatura_media_c: "",
        reducao_emissoes_tco2eq_ano: "",
        destinacao_digestato: "",
    });

    const toNumberOrNull = (value: string) =>
        value === "" ? null : Number(value);

    const toStringOrNull = (value: string) => {
        const trimmed = value.trim();
        return trimmed === "" ? null : trimmed;
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/tecnologia/biogas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usina_id: usinaId,
                    tipo_substrato: toStringOrNull(form.tipo_substrato),
                    quantidade_processada_t_dia: toNumberOrNull(form.quantidade_processada_t_dia),
                    teor_solidos_percent: toNumberOrNull(form.teor_solidos_percent),
                    tipo_biodigestor: toStringOrNull(form.tipo_biodigestor),
                    tratamento_biogas: toStringOrNull(form.tratamento_biogas),
                    equipamento_conversao: toStringOrNull(form.equipamento_conversao),
                    eficiencia_eletrica_percent: toNumberOrNull(form.eficiencia_eletrica_percent),
                    eficiencia_termica_percent: toNumberOrNull(form.eficiencia_termica_percent),
                    sistema_queima_excedente: toStringOrNull(form.sistema_queima_excedente),
                    producao_biogas_nm3_dia: toNumberOrNull(form.producao_biogas_nm3_dia),
                    pressao_media_bar: toNumberOrNull(form.pressao_media_bar),
                    temperatura_media_c: toNumberOrNull(form.temperatura_media_c),
                    destinacao_digestato: toStringOrNull(form.destinacao_digestato),
                }),
            });

            if (!res.ok) {
                throw new Error();
            }

            alert("Biogás cadastrado com sucesso");
        } catch {
            alert("Erro ao salvar dados de biogás");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container py-5">
            <div
                className="card border-0 shadow-sm mx-auto rounded-4"
                style={{ maxWidth: "1000px" }}
            >
                <div className="card-header bg-white border-0 pb-0 pt-4 px-4">
                    <span className="badge bg-primary-subtle text-primary mb-2">
                        Etapa 3 de 4
                    </span>
                    <h2 className="fw-bold mb-1">Tecnologia — Biogás</h2>
                    <p className="text-muted mb-0">
                        Informações técnicas, operacionais e ambientais.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-4 p-4 border rounded-4 bg-white shadow-sm"
                >
                    <div className="row g-3">

                        {/* Processo */}
                        <div className="form-floating col-md-6">
                            <input
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Tipo de substrato"
                                value={form.tipo_substrato}
                                onChange={(e) =>
                                    setForm({ ...form, tipo_substrato: e.target.value })
                                }
                            />
                            <label>Tipo de substrato</label>
                        </div>
                        <div className="form-floating col-md-6">
                            <input
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Tipo de biodigestor"
                                value={form.tipo_biodigestor}
                                onChange={(e) =>
                                    setForm({ ...form, tipo_biodigestor: e.target.value })
                                }
                            />
                            <label>Tipo de biodigestor</label>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-md-6 form-floating">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Quantidade processada"
                                value={form.quantidade_processada_t_dia}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        quantidade_processada_t_dia: e.target.value,
                                    })
                                }
                            />
                            <label>Quantidade processada (t/dia)</label>
                        </div>

                        <div className="form-floating col-md-6">
                            <input
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Tratamento do biogás"
                                value={form.tratamento_biogas}
                                onChange={(e) =>
                                    setForm({ ...form, tratamento_biogas: e.target.value })
                                }
                            />
                            <label>Tratamento do biogás</label>
                        </div>
                    </div>

                    <div className="form-floating">
                        <input
                            className="form-control rounded-3 border-secondary-subtle"
                            placeholder="Equipamento de conversão"
                            value={form.equipamento_conversao}
                            onChange={(e) =>
                                setForm({ ...form, equipamento_conversao: e.target.value })
                            }
                        />
                        <label>Equipamento de conversão</label>
                    </div>

                    {/* Eficiências */}
                    <div className="row g-3">
                        <div className="col-md-4 form-floating">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Eficiência elétrica"
                                value={form.eficiencia_eletrica_percent}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        eficiencia_eletrica_percent: e.target.value,
                                    })
                                }
                            />
                            <label>Eficiência elétrica (%)</label>
                        </div>

                        <div className="col-md-4 form-floating">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Eficiência térmica"
                                value={form.eficiencia_termica_percent}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        eficiencia_termica_percent: e.target.value,
                                    })
                                }
                            />
                            <label>Eficiência térmica (%)</label>
                        </div>
                        <div className="col-md-4 form-floating">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Teor de sólidos"
                                value={form.teor_solidos_percent}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        teor_solidos_percent: e.target.value,
                                    })
                                }
                            />
                            <label>Teor de sólidos (%)</label>
                        </div>
                    </div>

                    {/* Operação e ambiental */}
                    <div className="form-floating">
                        <input
                            className="form-control rounded-3 border-secondary-subtle"
                            placeholder="Sistema de queima excedente"
                            value={form.sistema_queima_excedente}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    sistema_queima_excedente: e.target.value,
                                })
                            }
                        />
                        <label>Sistema de queima excedente</label>
                    </div>

                    <div className="row g-3">
                        <div className="col-md-4 form-floating">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Produção biogás"
                                value={form.producao_biogas_nm3_dia}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        producao_biogas_nm3_dia: e.target.value,
                                    })
                                }
                            />
                            <label>Produção de biogás (Nm³/dia)</label>
                        </div>

                        <div className="col-md-4 form-floating">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Pressão média"
                                value={form.pressao_media_bar}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        pressao_media_bar: e.target.value,
                                    })
                                }
                            />
                            <label>Pressão média (bar)</label>
                        </div>

                        <div className="col-md-4 form-floating">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control rounded-3 border-secondary-subtle"
                                placeholder="Temperatura média"
                                value={form.temperatura_media_c}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        temperatura_media_c: e.target.value,
                                    })
                                }
                            />
                            <label>Temperatura média (°C)</label>
                        </div>
                    </div>
                    <div className="form-floating">
                        <input
                            className="form-control rounded-3 border-secondary-subtle"
                            placeholder="Destinação do digestato"
                            value={form.destinacao_digestato}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    destinacao_digestato: e.target.value,
                                })
                            }
                        />
                        <label>Destinação do digestato</label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary py-2 fw-semibold rounded-3 shadow-sm"
                    >
                        {loading ? "Salvando..." : "Continuar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
