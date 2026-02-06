"use client";

import { useState } from "react";

interface BiogasProps {
    usinaId: string;
}

export default function Biogas({ usinaId }: BiogasProps) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        capacidade_instalada_mw: "",
        energia_gerada_mensal_mwh: "",
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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const energiaMensal = form.energia_gerada_mensal_mwh
            ? Number(form.energia_gerada_mensal_mwh)
            : null;

        const energiaAnual =
            energiaMensal !== null ? energiaMensal * 12 : null;

        const res = await fetch("/api/tecnologia/biogas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usina_id: usinaId,
                capacidade_instalada_mw: Number(form.capacidade_instalada_mw) || null,
                energia_gerada_mensal_mwh: energiaMensal,
                energia_gerada_anual_mwh: energiaAnual,
                tipo_substrato: form.tipo_substrato || null,
                quantidade_processada_t_dia: Number(form.quantidade_processada_t_dia) || null,
                teor_solidos_percent: Number(form.teor_solidos_percent) || null,
                tipo_biodigestor: form.tipo_biodigestor || null,
                tratamento_biogas: form.tratamento_biogas || null,
                equipamento_conversao: form.equipamento_conversao || null,
                eficiencia_eletrica_percent: Number(form.eficiencia_eletrica_percent) || null,
                eficiencia_termica_percent: Number(form.eficiencia_termica_percent) || null,
                sistema_queima_excedente: form.sistema_queima_excedente || null,
                producao_biogas_nm3_dia: Number(form.producao_biogas_nm3_dia) || null,
                pressao_media_bar: Number(form.pressao_media_bar) || null,
                temperatura_media_c: Number(form.temperatura_media_c) || null,
                reducao_emissoes_tco2eq_ano: Number(form.reducao_emissoes_tco2eq_ano) || null,
                destinacao_digestato: form.destinacao_digestato || null,
            }),
        });

        if (!res.ok) {
            alert("Erro ao salvar dados de biogás");
            setLoading(false);
            return;
        }

        setLoading(false);
        alert("Biogás cadastrado com sucesso");
    }

    return (
        <div className="container py-5">
            <div
                className="card border-0 shadow-sm mx-auto rounded-4"
                style={{ maxWidth: "800px" }}
            >
                <div className="card-header bg-white border-0 pt-4 px-4">
                    <span className="badge bg-primary-subtle text-primary mb-2">
                        Etapa 3 de 4
                    </span>
                    <h2 className="fw-bold mb-1">Tecnologia — Biogás</h2>
                    <p className="text-muted mb-0">
                        Informações técnicas, operacionais e ambientais.
                    </p>
                </div>

                <div className="card-body px-4 pt-4 pb-5">
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">

                        {/* Capacidade e geração */}
                        <div className="row g-3">
                            <div className="col-md-6 form-floating">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="Capacidade instalada"
                                    value={form.capacidade_instalada_mw}
                                    onChange={(e) =>
                                        setForm({ ...form, capacidade_instalada_mw: e.target.value })
                                    }
                                />
                                <label>Capacidade instalada (MW)</label>
                            </div>

                            <div className="col-md-6 form-floating">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="Energia mensal"
                                    value={form.energia_gerada_mensal_mwh}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            energia_gerada_mensal_mwh: e.target.value,
                                        })
                                    }
                                />
                                <label>Energia gerada mensal (MWh)</label>
                            </div>
                        </div>

                        {/* Processo */}
                        <div className="form-floating">
                            <input
                                className="form-control"
                                placeholder="Tipo de substrato"
                                value={form.tipo_substrato}
                                onChange={(e) =>
                                    setForm({ ...form, tipo_substrato: e.target.value })
                                }
                            />
                            <label>Tipo de substrato</label>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6 form-floating">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
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

                            <div className="col-md-6 form-floating">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
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

                        <div className="form-floating">
                            <input
                                className="form-control"
                                placeholder="Tipo de biodigestor"
                                value={form.tipo_biodigestor}
                                onChange={(e) =>
                                    setForm({ ...form, tipo_biodigestor: e.target.value })
                                }
                            />
                            <label>Tipo de biodigestor</label>
                        </div>

                        <div className="form-floating">
                            <input
                                className="form-control"
                                placeholder="Tratamento do biogás"
                                value={form.tratamento_biogas}
                                onChange={(e) =>
                                    setForm({ ...form, tratamento_biogas: e.target.value })
                                }
                            />
                            <label>Tratamento do biogás</label>
                        </div>

                        <div className="form-floating">
                            <input
                                className="form-control"
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
                            <div className="col-md-6 form-floating">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
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

                            <div className="col-md-6 form-floating">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
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
                        </div>

                        {/* Operação e ambiental */}
                        <div className="form-floating">
                            <input
                                className="form-control"
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
                                    className="form-control"
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
                                    className="form-control"
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
                                    className="form-control"
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
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="Redução de emissões"
                                value={form.reducao_emissoes_tco2eq_ano}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        reducao_emissoes_tco2eq_ano: e.target.value,
                                    })
                                }
                            />
                            <label>Redução de emissões (tCO₂eq/ano)</label>
                        </div>

                        <div className="form-floating">
                            <input
                                className="form-control"
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
                            className="btn btn-primary py-3 fw-semibold mt-3"
                        >
                            {loading ? "Salvando..." : "Salvar tecnologia"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}