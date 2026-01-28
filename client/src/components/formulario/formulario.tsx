import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import './formulario.css' 

const schema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 letras"),
  email: z.string().email("Email inválido"),

  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),

  address: z.string().min(5, "Endereço obrigatório"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

/* ==========================
   Multi Step Form
========================== */

export function Formulario() {
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  /* ==========================
     Campos por etapa
  ========================== */

  const steps = [
    ["name", "email"],
    ["password", "confirmPassword"],
    ["address"],
  ] as const;

  /* ==========================
     Próxima etapa com validação
  ========================== */

  async function nextStep() {
    const fields = steps[step];
    const valid = await trigger(fields);

    if (valid) setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  /* ==========================
     Submit final
  ========================== */

  function onSubmit(data: FormData) {
    console.log("Dados enviados:", data);
    alert("Formulindo enviado com sucesso!");
  }

  return (
    <div className="main">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <h2 className="title">Cadastro de Variaveis Tecnicas</h2>
        <br />
        <h3 className="title">Etapa {step + 1} de 3</h3>

        {/* ======================
            STEP 1
        ====================== */}
        {step === 0 && (
          <>
            <input placeholder="Nome" {...register("name")} />
            <p>{errors.name?.message}</p>

            <input placeholder="Email" {...register("email")} />
            <p>{errors.email?.message}</p>
          </>
        )}

        {/* ======================
            Botões
        ====================== */}
        <div style={{ marginTop: 20 }}>
          {step > 0 && (
            <button type="button" onClick={prevStep}>
              Voltar
            </button>
          )}

          {step < 2 ? (
            <button type="button" onClick={nextStep}>
              Próximo
            </button>
          ) : (
            <button type="submit">Enviar</button>
          )}
        </div>
      </form>
    </div>
  );
}