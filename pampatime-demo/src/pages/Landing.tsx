import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Landing(){
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white p-6 text-center">
      <h1 className="text-4xl font-bold text-emerald-700 mb-4">PampaTime</h1>
      <p className="text-gray-600 max-w-xl mb-8">Gestão simplificada de horários acadêmicos. Organize salas, professores, turmas e semestres com colaboração segura.</p>
      <div className="flex gap-4">
        <Link to="/login"><Button>Entrar</Button></Link>
        <a href="#contato" className="text-sm text-emerald-700 underline">Fale conosco</a>
      </div>
    </div>
  );
}
