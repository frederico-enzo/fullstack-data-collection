-- CreateEnum
CREATE TYPE "tecnologia_enum" AS ENUM ('FOTOVOLTAICA', 'BIOGAS', 'PCH', 'ARMAZENAMENTO');

-- CreateEnum
CREATE TYPE "comprador_enum" AS ENUM ('COMERCIALIZADORAS', 'AGREGADORES', 'CENTRAIS_COMPENSACAO', 'COMERCIALIZADORAS_VAREJISTAS');

-- CreateEnum
CREATE TYPE "contrato_enum" AS ENUM ('CCEAL', 'ACR', 'GD', 'BATERIAS', 'VAREJISTAS');

-- CreateTable
CREATE TABLE "armazenamento" (
    "id" BIGSERIAL NOT NULL,
    "geradora_id" BIGINT,
    "fator_capacidade_percent" DECIMAL(5,2),
    "tecnologia_bateria" VARCHAR,
    "fabricante_bateria" VARCHAR,
    "quantidade_modulos" INTEGER,
    "capacidade_unitaria_kwh" DECIMAL(18,2),
    "tensao_nominal_sistema_v" DECIMAL(10,2),
    "corrente_nominal_a" DECIMAL(10,2),
    "profundidade_descarga_percent" DECIMAL(5,2),
    "vida_util_ciclos" INTEGER,
    "tempo_recarga_horas" DECIMAL(10,2),
    "temperatura_operacao_c" DECIMAL(6,2),
    "sistema_gerenciamento_bms" VARCHAR,
    "sistema_conversao_potencia" VARCHAR,
    "eficiencia_conversao_percent" DECIMAL(5,2),
    "modalidade_operacao" VARCHAR,
    "tipo_conexao" VARCHAR,
    "nivel_tensao_conexao" VARCHAR,

    CONSTRAINT "armazenamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biogas" (
    "id" BIGSERIAL NOT NULL,
    "geradora_id" BIGINT,
    "capacidade_instalada_mw" DECIMAL(18,2),
    "energia_gerada_mensal_mwh" DECIMAL(18,2),
    "energia_gerada_anual_mwh" DECIMAL(18,2),
    "tipo_substrato" VARCHAR,
    "quantidade_processada_t_dia" DECIMAL(18,2),
    "teor_solidos_percent" DECIMAL(5,2),
    "tipo_biodigestor" VARCHAR,
    "tratamento_biogas" VARCHAR,
    "equipamento_conversao" VARCHAR,
    "eficiencia_eletrica_percent" DECIMAL(5,2),
    "eficiencia_termica_percent" DECIMAL(5,2),
    "sistema_queima_excedente" VARCHAR,
    "producao_biogas_nm3_dia" DECIMAL(18,2),
    "pressao_media_bar" DECIMAL(6,2),
    "temperatura_media_c" DECIMAL(6,2),
    "reducao_emissoes_tco2eq_ano" DECIMAL(18,2),
    "destinacao_digestato" VARCHAR,

    CONSTRAINT "biogas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotovoltaico" (
    "id" BIGSERIAL NOT NULL,
    "geradora_id" BIGINT,
    "area_ocupada_m2" DECIMAL(18,2),
    "numero_modulos" INTEGER,
    "tipo_modulo" VARCHAR,
    "potencia_unitaria_modulo_w" INTEGER,
    "tipo_inversor" VARCHAR,
    "quantidade_inversores" INTEGER,
    "tensao_nominal_sistema_v" INTEGER,
    "irradiacao_media_kwh_m2_ano" DECIMAL(18,2),
    "temperatura_media_operacao_c" DECIMAL(5,2),
    "inclinacao_graus" DECIMAL(5,2),
    "orientacao_modulos" VARCHAR,
    "area_desmatada_ha" DECIMAL(18,2),
    "area_reaproveitada_ha" DECIMAL(18,2),
    "tipo_conexao" VARCHAR,
    "fase" VARCHAR,

    CONSTRAINT "fotovoltaico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pch" (
    "id" BIGSERIAL NOT NULL,
    "geradora_id" BIGINT,
    "rio_aproveitado" TEXT,
    "vazao_media_m3s" DECIMAL(18,2),
    "vazao_turbinada_m3s" DECIMAL(18,2),
    "queda_bruta_m" DECIMAL(18,2),
    "queda_liquida_m" DECIMAL(18,2),
    "tipo_turbina" TEXT,
    "numero_turbinas" INTEGER,
    "potencia_unitaria_turbina_mw" DECIMAL(18,2),
    "rendimento_turbina_percent" DECIMAL(5,2),
    "rendimento_gerador_percent" DECIMAL(5,2),
    "eficiencia_global_percent" DECIMAL(5,2),
    "tipo_gerador" TEXT,
    "tensao_nominal_sistema_kv" DECIMAL(10,2),
    "sistema_regulacao" TEXT,
    "nivel_tensao_conexao" TEXT,
    "subestacao_conexao" TEXT,
    "distribuidora_vinculada" TEXT,

    CONSTRAINT "pch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ator" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "cnpj_cpf" TEXT,

    CONSTRAINT "ator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipio" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,

    CONSTRAINT "municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipamento" (
    "id" BIGSERIAL NOT NULL,
    "tipo_equipamento" TEXT,
    "fabricante" TEXT,
    "modelo" TEXT,
    "potencia_nominal" DECIMAL(18,2),
    "eficiencia_percent" DECIMAL(5,2),
    "ano_fabricacao" INTEGER,
    "valor" DECIMAL(18,2),
    "vida_util_anos" INTEGER,

    CONSTRAINT "equipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geradora" (
    "id" BIGSERIAL NOT NULL,
    "tecnologia" "tecnologia_enum" NOT NULL,
    "ator_id" BIGINT NOT NULL,
    "municipio_id" BIGINT NOT NULL,
    "data_inicio_operacao" TIMESTAMP(6),
    "data_inicio_coleta" TIMESTAMP(6),
    "tipo_comprador" "comprador_enum" NOT NULL,
    "tipo_contrato" "contrato_enum" NOT NULL,
    "reducao_co2_ano" TEXT,
    "media_energia_gerada_anual" DECIMAL(18,2),
    "media_energia_gerada_mensal" DECIMAL(18,2),
    "media_volume_vendido" DECIMAL(18,2),
    "capacidade_anual_geracao" DECIMAL(18,2),

    CONSTRAINT "geradora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geradora_equipamento" (
    "geradora_id" BIGINT NOT NULL,
    "equipamento_id" BIGINT NOT NULL,

    CONSTRAINT "geradora_equipamento_pkey" PRIMARY KEY ("geradora_id","equipamento_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "armazenamento_geradora_id_key" ON "armazenamento"("geradora_id");

-- CreateIndex
CREATE UNIQUE INDEX "biogas_geradora_id_key" ON "biogas"("geradora_id");

-- CreateIndex
CREATE UNIQUE INDEX "fotovoltaico_geradora_id_key" ON "fotovoltaico"("geradora_id");

-- CreateIndex
CREATE UNIQUE INDEX "pch_geradora_id_key" ON "pch"("geradora_id");

-- CreateIndex
CREATE UNIQUE INDEX "ator_email_key" ON "ator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ator_cnpj_cpf_key" ON "ator"("cnpj_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "municipio_nome_key" ON "municipio"("nome");

-- AddForeignKey
ALTER TABLE "armazenamento" ADD CONSTRAINT "armazenamento_geradora_id_fkey" FOREIGN KEY ("geradora_id") REFERENCES "geradora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biogas" ADD CONSTRAINT "biogas_geradora_id_fkey" FOREIGN KEY ("geradora_id") REFERENCES "geradora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotovoltaico" ADD CONSTRAINT "fotovoltaico_geradora_id_fkey" FOREIGN KEY ("geradora_id") REFERENCES "geradora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pch" ADD CONSTRAINT "pch_geradora_id_fkey" FOREIGN KEY ("geradora_id") REFERENCES "geradora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geradora" ADD CONSTRAINT "geradora_ator_id_fkey" FOREIGN KEY ("ator_id") REFERENCES "ator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geradora" ADD CONSTRAINT "geradora_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geradora_equipamento" ADD CONSTRAINT "geradora_equipamento_geradora_id_fkey" FOREIGN KEY ("geradora_id") REFERENCES "geradora"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geradora_equipamento" ADD CONSTRAINT "geradora_equipamento_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "equipamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
