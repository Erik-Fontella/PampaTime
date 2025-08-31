// src/contexts/AuthorizationContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from './AuthContext';
import { UserRole, UserPermissions } from '@/types/User';

interface AuthorizationContextType {
  userRole: UserRole | null;
  permissions: UserPermissions | null;
  loading: boolean;
  isCoordinatorGeral: boolean;
  isCoordinatorCurso: boolean;
  canCreateUsers: boolean;
  hasPermission: (permission: keyof UserPermissions) => boolean;
}

const AuthorizationContext = createContext<AuthorizationContextType | undefined>(undefined);

export const useAuthorization = () => {
  const context = useContext(AuthorizationContext);
  if (context === undefined) {
    throw new Error('useAuthorization must be used within an AuthorizationProvider');
  }
  return context;
};

interface AuthorizationProviderProps {
  children: ReactNode;
}

export const AuthorizationProvider: React.FC<AuthorizationProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser) {
        setUserRole(null);
        setPermissions(null);
        setLoading(false);
        return;
      }

      try {
        // Buscar role do usuário no Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserRole;
          setUserRole(userData);
          
          // Definir permissões baseadas no role
          const userPermissions: UserPermissions = {
            canCreateUsers: userData.role === 'coordenador-geral',
            canManageAllCourses: userData.role === 'coordenador-geral',
            canManageAssignedCourses: true,
            canViewReports: true,
            canEditSchedules: true,
          };
          
          setPermissions(userPermissions);
        } else {
          // Usuário não tem role definido - possível problema de segurança
          console.error('Usuário autenticado sem role definido:', currentUser.uid);
          setUserRole(null);
          setPermissions(null);
        }
      } catch (error) {
        console.error('Erro ao buscar role do usuário:', error);
        setUserRole(null);
        setPermissions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [currentUser]);

  const hasPermission = (permission: keyof UserPermissions): boolean => {
    return permissions?.[permission] || false;
  };

  const value: AuthorizationContextType = {
    userRole,
    permissions,
    loading,
    isCoordinatorGeral: userRole?.role === 'coordenador-geral',
    isCoordinatorCurso: userRole?.role === 'coordenador-curso',
    canCreateUsers: hasPermission('canCreateUsers'),
    hasPermission,
  };

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};
