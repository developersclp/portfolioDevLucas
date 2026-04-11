# 🌐 Portfólio Profissional — Next.js + PostgreSQL

Portfólio dinâmico com painel administrativo, banco de dados PostgreSQL e geração automática de currículo em PDF.

## 🏗️ Tecnologias

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, Framer Motion
- **Backend**: Server Actions (Next.js), Prisma ORM
- **Database**: PostgreSQL
- **Auth**: JWT + bcryptjs (sessão stateless via httpOnly cookies)
- **PDF**: jsPDF (geração programática, sem html2canvas)

## 📁 Estrutura do Projeto

```
├── prisma/
│   ├── schema.prisma        # Modelos do banco de dados
│   ├── seed.ts              # Dados iniciais (admin + dados demo)
│   └── migrations/          # Migrações do banco
├── public/
│   ├── fundo.jpg            # Imagem de fundo do hero
│   ├── teste.webm           # Vídeo de fundo do hero
│   └── uploads/             # Upload local de imagens (dev)
├── src/
│   ├── app/
│   │   ├── page.tsx          # Página principal (Server Component)
│   │   ├── layout.tsx        # Layout raiz
│   │   ├── globals.css       # Estilos globais + Tailwind
│   │   └── admin/            # Painel administrativo completo
│   ├── components/
│   │   ├── sections/         # Seções da página (Hero, Projetos, etc.)
│   │   ├── admin/            # Formulários do painel admin
│   │   └── ui/               # Componentes reutilizáveis (cards, badges, etc.)
│   ├── lib/
│   │   ├── prisma.ts         # Singleton do Prisma Client
│   │   ├── session.ts        # Gerenciamento de sessão JWT
│   │   ├── auth-actions.ts   # Login/Logout (Server Actions)
│   │   ├── admin-actions.ts  # CRUD Projetos/Certificações/Categorias
│   │   ├── profile-actions.ts # CRUD Perfil/Experiência/Educação/Idiomas
│   │   ├── generate-resume.ts # Busca dados do DB para o currículo
│   │   ├── upload.ts         # Upload local de arquivos
│   │   └── utils.ts          # Utilitários (cn)
│   ├── types/
│   │   └── index.ts          # Types centralizados (Project, Certification)
│   └── middleware.ts         # Proteção de rotas /admin/*
```

## 🚀 Setup Local

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Edite .env com suas credenciais do PostgreSQL
```

### 3. Criar banco de dados e tabelas
```bash
npm run db:push
```

### 4. Popular com dados iniciais (opcional)
```bash
npm run db:seed
```

### 5. Rodar em desenvolvimento
```bash
npm run dev
```

## 🚂 Deploy no Railway

### 1. Criar projeto no Railway
- Acesse [railway.app](https://railway.app) e crie um novo projeto
- Adicione um **PostgreSQL database** ao projeto

### 2. Conectar repositório
- Adicione seu repositório GitHub ao projeto

### 3. Configurar variáveis de ambiente
No Railway, vá em **Settings > Variables** e adicione:

| Variável          | Valor                                         |
|-------------------|-----------------------------------------------|
| `DATABASE_URL`    | *Fornecida automaticamente pelo plugin PostgreSQL* |
| `ADMIN_EMAIL`     | Seu email de login do admin                   |
| `ADMIN_PASSWORD`  | Sua senha de admin                            |
| `SESSION_SECRET`  | String aleatória de 64+ caracteres            |

> **Dica**: Para gerar o SESSION_SECRET:  
> `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

### 4. Build e Deploy
O Railway detecta automaticamente o `package.json` e executa:
```bash
npm install        # Instala dependências (+ postinstall roda prisma generate)
npm run build      # prisma generate && prisma db push && next build
npm run start      # Inicia o servidor de produção
```

### 5. Rodar o seed (primeira vez)
Após o primeiro deploy, abra o terminal do Railway e execute:
```bash
npm run db:seed
```

## 📊 Painel Administrativo

Acesse em `/admin/login` com as credenciais definidas nas variáveis de ambiente.

**Funcionalidades:**
- 📝 Gerenciar Projetos (CRUD + upload de imagem)
- 🏅 Gerenciar Certificações (CRUD + upload de imagem)
- 🏷️ Gerenciar Categorias
- 👤 Editar Perfil (nome, título, resumo, links sociais, skills)
- 💼 Gerenciar Experiências profissionais
- 🎓 Gerenciar Educação
- 🌍 Gerenciar Idiomas

## ⚠️ Notas Importantes

- **Imagens por URL**: Em produção no Railway, use URLs externas para imagens (Unsplash, Imgur, etc.). O upload local funciona apenas em desenvolvimento.
- **Banco de dados**: O Railway oferece PostgreSQL gratuito no plano trial. O `prisma db push` roda automaticamente no build.
- **Segurança**: Nunca commite o arquivo `.env` com credenciais reais. Use `.env.example` como referência.
