import Link from "next/dist/client/link";
import FormularioPage from "./interface/formulario/page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex items-center justify-center flex-col w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-zinc-800">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Projeto Araucaria
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400 text-center">
          Sistema de Coleta de Dados para Analise de Transição Energética no Oeste do Paraná.
        </p>
        <Link
          href="/interface/formulario/"
          className="inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Acessar Formulário
        </Link>
      </div>
    </div>
  );
}