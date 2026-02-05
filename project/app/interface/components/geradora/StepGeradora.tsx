
type StepGeradoraProps = {
    atorId: string;
    onNext?: (id: string) => void;
};
export default function StepGeradora({ atorId, onNext }: StepGeradoraProps) {
  return (
    <div>Step Geradora - Ator ID: {atorId}</div>
  );
}   