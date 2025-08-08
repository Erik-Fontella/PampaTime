import logo from '../assets/logo.png';
import { FiClock, FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const getUserInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="font-normal fixed top-0 left-0 w-full z-[1000] bg-white px-8 py-4 shadow-sm">
      <nav className="max-w-[1200px] mx-auto flex justify-between items-center relative">

        <div className="flex gap-8 text-gray-600 text-sm">
          <Link
            to="/homedashboard"
            className="relative after:content-[''] after:absolute after:left-0 after:bottom-[0.1em] after:h-[1px] after:w-0 after:bg-[#49C17B] after:transition-all after:duration-200 hover:after:w-full"
          >
            Início
          </Link>

          {/* aqui vcs podem adicionar mais link, como eu fiz o History e o HomeDashboard */}
          {["Relatórios", "Configuração", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-[0.1em] after:h-[1px] after:w-0 after:bg-[#49C17B] after:transition-all after:duration-200 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <img src={logo} alt="PampaTime Logo" className="h-24" />
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <Link to="/history">
            <FiClock className="text-2xl text-gray-600 hover:text-[#49C17B] cursor-pointer transition-colors" />
          </Link>
          
          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || 'User'} />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {getUserInitials(currentUser.displayName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentUser.displayName || 'Usuário'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <FiUser className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <FiLogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
