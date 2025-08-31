 // src/types/User.ts

export interface UserRole {
  uid: string;
  email: string;
  displayName: string;
  role: 'coordenador-geral' | 'coordenador-curso';
  courseIds?: string[]; // IDs dos cursos que o coordenador de curso gerencia
  createdAt: Date;
  createdBy: string; // UID do usuário que criou este usuário
  isActive: boolean;
}

export interface CreateUserRequest {
  email: string;
  displayName: string;
  role: 'coordenador-geral' | 'coordenador-curso';
  courseIds?: string[];
  tempPassword: string;
}

export interface UserPermissions {
  canCreateUsers: boolean;
  canManageAllCourses: boolean;
  canManageAssignedCourses: boolean;
  canViewReports: boolean;
  canEditSchedules: boolean;
}
