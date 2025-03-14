# PampaTime
##### ![PampaTime](https://img.shields.io/badge/Pampa-Time-purple?style=plastic)


## Índice

- [Workflow](#workflow)
- [Convenções de Branch](#convenções-de-branch)
- [Convenções de Commit](#convenções-de-commit)
- [Como Contribuir](#como-contribuir)

## Workflow

Este projeto utiliza um modelo de branching que combina práticas do Gitflow com um foco em integração contínua e revisões de código. O fluxo de trabalho é estruturado da seguinte forma:

1. **Branch `main`**:
   - Contém o código de produção.
   - É atualizada uma vez por semana ou quando houver atualizações significativas.
   - Merges para a `main` são feitos a partir da `develop` após testes completos.

2. **Branch `develop`**:
   - Serve como a branch principal de desenvolvimento.
   - Todas as novas funcionalidades e correções são integradas aqui.
   - Após a estabilização, a `develop` é mergeada na `main`.

3. **Branches de Feature e Correção**:
   - Cada nova funcionalidade ou correção de bug é desenvolvida em uma branch separada, criada a partir da `develop`.
   - Nomes seguem a convenção `feature/nome-da-feature` ou `bugfix/nome-do-bug`.
   - Merges para a `develop` são realizados via Pull Requests (PRs) no GitHub.

### Fluxo de Trabalho Resumido:

- Crie uma branch de feature ou correção a partir da `develop`.
- Desenvolva a funcionalidade ou correção.
- Abra um PR para integrar a feature ou correção na `develop`.
- Após a aprovação e merge na `develop`, a branch de feature ou correção pode ser deletada.
- A `main` é atualizada periodicamente com as mudanças da `develop`.

## Convenções de Branch

Adotamos as seguintes convenções para nomeação de branches:

- **`main`**: Código de produção estável.
- **`develop`**: Integração de funcionalidades e correções em andamento.
- **Feature e Bugfix Branches**:
  - Criadas para o desenvolvimento de novas funcionalidades ou correções de bugs.
  - Naming convention: 
    - `feature/nome-da-feature`
    - `bugfix/nome-do-bug`
  - Exemplo: `feature/adicionar-autenticacao` ou `bugfix/corrigir-login`.

## Convenções de Commit

Para manter um histórico de commits claro e útil, seguimos a convenção abaixo:

### **Formato do Commit**:
- tipo: breve descrição

### **Tipos de Commit**:
- `feat`: Introdução de uma nova funcionalidade.
- `fix`: Correção de um bug.
- `docs`: Alterações na documentação.
- `style`: Mudanças de formatação, sem alteração de código (espaços, vírgulas, etc.).
- `refactor`: Alteração de código que não corrige bugs nem adiciona funcionalidades.
- `test`: Adição ou correção de testes.
- `chore`: Tarefas de manutenção ou mudanças que não alteram o código de produção.

- **Exemplos**:
- `feat: adicionar autenticação ao sistema`
- `fix: corrigir erro de validação no formulário de login`
- `docs: atualizar README com instruções de instalação`

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção (`git checkout -b feature/nome-da-feature` ou `git checkout -b bugfix/nome-do-bug`).
3. Commit suas alterações (`git commit -m 'feat: adicionar nova funcionalidade'`).
4. Faça um push para a branch (`git push origin feature/nome-da-feature` ou `git push origin bugfix/nome-do-bug`).
5. Abra um Pull Request no GitHub.

## Ferramentas e Recursos

- **Ferramenta de Gerenciamento de Projeto:** ![GitHub](https://img.shields.io/badge/GitHub-000000.svg?style=for-the-badge&logo=github&logoColor=white)

- **Ferramenta de Comunicação:** ![Discord](https://img.shields.io/badge/Discord-000000.svg?style=for-the-badge&logo=discord&logoColor=white)

- **Sistema de Controle de Versão:** ![GIT](https://img.shields.io/badge/git-000000.svg?style=for-the-badge&logo=git&logoColor=white)

- **Edição do Código-Fonte:** ![Visual Studio Code](https://img.shields.io/badge/VSCODE-000?style=for-the-badge&logo=visual-studio-code)

![PampaTime](https://img.shields.io/badge/Pampa-Time-lightblue?style=plastic)


