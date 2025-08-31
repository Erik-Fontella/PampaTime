import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AuthorizationProvider } from "@/contexts/AuthorizationContext";
import { managementRoutes, ManagementRouteConfig } from "./config/managementRoutes";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HomeDashboard from "./pages/HomeDashboard";
import History from "./pages/History";
import Login from "./pages/Login";
import GenericManagement from "./pages/GenericManagementPage";
import CreateUserForm from "./components/admin/CreateUserForm";

const queryClient = new QueryClient();

// Componente para rota raiz que redireciona baseado no estado de autenticação
const RootRoute = () => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto mb-4 border-4 border-green-600 border-t-transparent rounded-full"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />;
};

// Componente para rotas que redirecionam usuários logados
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AuthorizationProvider>
            <Routes>
              {/* Rota raiz que redireciona baseado na autenticação */}
              <Route path="/" element={<RootRoute />} />
              
              {/* Rota Home - Pública para todos */}
              <Route path="/home" element={<Home />} />
              
              {/* Rota de Login - redirecciona para dashboard se o usuário estiver logado */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              
              {/* ROTA DE REGISTRO REMOVIDA - Agora apenas coordenadores gerais podem criar usuários */}
              
              {/* Rotas protegidas */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/homedashboard" 
                element={
                  <ProtectedRoute>
                    <HomeDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rota para cadastro de usuários - APENAS para coordenadores gerais */}
              <Route 
                path="/admin/create-user" 
                element={
                  <ProtectedRoute>
                    <CreateUserForm />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rotas de gerenciamento protegidas */}
              {Object.values(managementRoutes).map((route: ManagementRouteConfig<any>) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute>
                      <GenericManagement
                        title={route.title}
                        collectionPath={route.collectionPath}
                        searchPlaceholder={route.searchPlaceholder}
                        addBtnLabel={route.addBtnLabel}
                        columns={route.columns}
                      />
                    </ProtectedRoute>
                  }
                />
              ))}
              
              {/* Rota 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthorizationProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
