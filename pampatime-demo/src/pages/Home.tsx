// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  Users, 
  MapPin, 
  BookOpen, 
  Eye, 
  Filter,
  Calendar,
  CheckCircle
} from 'lucide-react';
import logo from '../assets/logo.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Navigation Links */}
            <div className="flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-green-600 font-medium">
                Home
              </a>
              <a href="#sobre" className="text-gray-600 hover:text-green-600 font-medium">
                Sobre
              </a>
              <a href="#guia" className="text-gray-600 hover:text-green-600 font-medium">
                Guia
              </a>
              <a href="#contato" className="text-gray-600 hover:text-green-600 font-medium">
                Contato
              </a>
            </div>

            {/* Logo */}
            <div className="flex-1 flex justify-center">
              <img src={logo} alt="PampaTime" className="h-12" />
            </div>

            {/* Login Button */}
            <div>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                PampaTime
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                O sistema inteligente de gerenciamento de horários que sua instituição precisa. 
                Simplifique a organização das aulas e maximize o uso dos recursos.
              </p>
              <div className="flex gap-4">
                <Link to="/register">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                    Começar Agora
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
                >
                  Saiba mais
                </Button>
              </div>
            </div>

            {/* Visualização de Horários */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-700">Visualização de Horários</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm font-medium flex-1">
                    Física
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded text-sm font-medium flex-1">
                    Algoritmos
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium">
                  Matemática
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recursos poderosos para a instituição
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Otimização de Horários */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Otimização de Horários
                </h3>
                <p className="text-gray-600">
                  Organize os horários das aulas de forma inteligente, evitando conflitos e maximizando a eficiência.
                </p>
              </CardContent>
            </Card>

            {/* Gestão de Professores */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Gestão de Professores
                </h3>
                <p className="text-gray-600">
                  Cadastre e organize todos os professores, definindo disponibilidade suas disciplinas e horários.
                </p>
              </CardContent>
            </Card>

            {/* Alocação de Salas */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Alocação de Salas
                </h3>
                <p className="text-gray-600">
                  Distribua as aulas pelas salas mais adequadas, considerando o tamanho da turma e os recursos necessários.
                </p>
              </CardContent>
            </Card>

            {/* Gestão de Disciplinas */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Gestão de Disciplinas
                </h3>
                <p className="text-gray-600">
                  Organize as disciplinas por semestre, curso e turma, facilitando o planejamento acadêmico.
                </p>
              </CardContent>
            </Card>

            {/* Visualização Intuitiva */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Visualização Intuitiva
                </h3>
                <p className="text-gray-600">
                  Interface clara e intuitiva que permite visualizar rapidamente os horários e identificar possíveis conflitos.
                </p>
              </CardContent>
            </Card>

            {/* Filtros Avançados */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Filtros Avançados
                </h3>
                <p className="text-gray-600">
                  Filtre os horários por professor, sala, período ou turma para encontrar rapidamente a informação desejada.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para transformar a gestão de horários na sua instituição?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Simplifique o processo de criação e organização de horários acadêmicos com o PampaTime
          </p>
          <Link to="/register">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Começar Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2">
              <img src={logo} alt="PampaTime" className="h-8" />
              <span className="text-sm text-gray-600">
                © 2025 Pampa Time. Todos os direitos reservados.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
