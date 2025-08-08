# Sistema de Autenticação Firebase - PampaTime

## 🔧 Configuração do Firebase

### 1. Criar projeto no Firebase Console
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto" ou selecione um existente
3. Siga o assistente de criação

### 2. Habilitar Authentication
1. No menu lateral, clique em "Authentication"
2. Vá na aba "Sign-in method"
3. Habilite "Email/password"
4. (Opcional) Configure outros métodos como Google, GitHub, etc.

### 3. Configurar Firestore Database
1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha o modo (teste para desenvolvimento)
4. Selecione a localização

### 4. Obter configurações do projeto
1. Clique no ícone de engrenagem ⚙️ > "Configurações do projeto"
2. Role para baixo até "Seus aplicativos"
3. Clique em "Aplicativo da Web" (ícone `</>`)
4. Registre o aplicativo com o nome "PampaTime"
5. Copie as configurações do `firebaseConfig`

### 5. Configurar variáveis de ambiente
1. Abra o arquivo `.env` na raiz do projeto
2. Substitua os valores placeholder pelas configurações reais:

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## 🚀 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Login com email/senha
- [x] Registro de novos usuários
- [x] Recuperação de senha
- [x] Logout
- [x] Proteção de rotas
- [x] Persistência de sessão

### 🎨 Interface
- [x] Formulário de login responsivo
- [x] Formulário de registro
- [x] Menu dropdown no header com informações do usuário
- [x] Avatar personalizado com iniciais
- [x] Feedback visual para erros e carregamento

### 🛡️ Segurança
- [x] Validação de formulários
- [x] Tratamento de erros específicos do Firebase
- [x] Redirecionamento automático baseado no estado de autenticação

## 📱 Como usar

### Para usuários não autenticados
- Acesse `/login` para fazer login
- Acesse `/register` para criar uma conta
- Todas as outras rotas redirecionam para login

### Para usuários autenticados
- Acesso liberado para todas as rotas protegidas
- Avatar no header com menu dropdown
- Opção de logout disponível

## 🔗 Rotas

| Rota | Descrição | Proteção |
|------|-----------|----------|
| `/login` | Página de login | Pública* |
| `/register` | Página de registro | Pública* |
| `/` | Página principal | Protegida |
| `/homedashboard` | Dashboard | Protegida |
| `/history` | Histórico | Protegida |
| `/salas`, `/professores`, etc. | Gerenciamento | Protegida |

*Rotas públicas redirecionam usuários logados para a home

## 🐛 Resolução de problemas

### Tela branca após implementação
1. Verifique se as configurações do Firebase estão corretas no `.env`
2. Abra o Console do navegador (F12) para ver erros
3. Certifique-se de que o projeto Firebase está ativo

### Erro "Firebase: Error (auth/configuration-not-found)"
- As configurações no `.env` estão incorretas
- Verifique se todas as variáveis estão preenchidas

### Erro de CORS
- Adicione seu domínio (localhost:8081) nas configurações do Firebase
- Vá em Authentication > Settings > Authorized domains

## 📦 Dependências adicionadas
- Todas as dependências necessárias já estavam instaladas
- Usando `lucide-react` para ícones
- Componentes UI do shadcn/ui

## 🎯 Próximos passos sugeridos
1. Implementar perfil do usuário editável
2. Adicionar autenticação com Google/GitHub
3. Implementar sistema de roles/permissões
4. Adicionar avatar upload
5. Implementar 2FA (autenticação em duas etapas)
