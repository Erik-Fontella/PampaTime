// src/components/admin/CreateUserForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, User, Shield, Key } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/contexts/AuthorizationContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { CreateUserRequest, UserRole } from '@/types/User';

interface CreateUserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: '',
    displayName: '',
    role: 'coordenador-curso',
    tempPassword: '',
    courseIds: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { currentUser } = useAuth();
  const { canCreateUsers, isCoordinatorGeral } = useAuthorization();

  // Verificação de segurança
  if (!canCreateUsers || !isCoordinatorGeral) {
    return (
      <Alert variant="destructive">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Acesso negado. Apenas coordenadores gerais podem cadastrar novos usuários.
        </AlertDescription>
      </Alert>
    );
  }

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, tempPassword: password }));
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('Email é obrigatório');
      return false;
    }

    if (!formData.displayName.trim()) {
      setError('Nome é obrigatório');
      return false;
    }

    if (!formData.tempPassword.trim()) {
      setError('Senha temporária é obrigatória');
      return false;
    }

    if (formData.tempPassword.length < 8) {
      setError('Senha deve ter pelo menos 8 caracteres');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!currentUser) {
      setError('Usuário não autenticado');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);

      // 1. Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.tempPassword
      );

      // 2. Atualizar profile com displayName
      await updateProfile(userCredential.user, { 
        displayName: formData.displayName 
      });

      // 3. Criar documento do usuário no Firestore
      const newUserRole: UserRole = {
        uid: userCredential.user.uid,
        email: formData.email,
        displayName: formData.displayName,
        role: formData.role,
        courseIds: formData.courseIds,
        createdAt: new Date(),
        createdBy: currentUser.uid,
        isActive: true
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUserRole);

      // 4. Sucesso
      setSuccess(`Usuário ${formData.displayName} criado com sucesso! Senha temporária: ${formData.tempPassword}`);
      
      // Reset form
      setFormData({
        email: '',
        displayName: '',
        role: 'coordenador-curso',
        tempPassword: '',
        courseIds: []
      });

      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }

    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este email já está em uso');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/weak-password':
          setError('Senha muito fraca');
          break;
        default:
          setError(`Erro ao criar usuário: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <User className="h-6 w-6" />
          Cadastrar Novo Coordenador
        </CardTitle>
        <CardDescription>
          Apenas coordenadores gerais podem cadastrar novos usuários no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription className="whitespace-pre-line">{success}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="coordenador@exemplo.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Nome Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="displayName"
                type="text"
                placeholder="Nome Completo"
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Tipo de Coordenador</Label>
            <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coordenador-geral">Coordenador Geral</SelectItem>
                <SelectItem value="coordenador-curso">Coordenador de Curso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tempPassword">Senha Temporária</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="tempPassword"
                  type="text"
                  placeholder="Senha temporária"
                  value={formData.tempPassword}
                  onChange={(e) => handleChange('tempPassword', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={generateTempPassword}
              >
                Gerar
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Usuário'}
            </Button>
            
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateUserForm;
