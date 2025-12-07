# Myndo Test - Frontend

Frontend React/Next.js com Tailwind CSS para gerenciamento de cards com upload de arquivos. Deploy automatizado na Vercel.

## 🚀 Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Axios
- Jest & React Testing Library
- Vercel (Deploy)

## 📋 Pré-requisitos

- Node.js 20+
- Backend rodando (myndo-test-backend)

## 🔧 Instalação

1. Clone o repositório

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🏃 Executando o projeto

### Desenvolvimento
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Produção
```bash
npm run build
npm run start
```

## 🎨 Funcionalidades

### ✅ Gerenciamento de Cards
- Listar todos os cards
- Criar novo card
- Editar card existente
- Deletar card

### 📁 Upload de Arquivos
- Upload de arquivo para um card
- Download de arquivo via presigned URL (AWS S3)
- Substituir arquivo existente
- Indicador visual de upload em andamento

### 🎯 Interface
- Design limpo e moderno com Tailwind CSS
- Totalmente responsivo
- Feedback visual para todas as ações
- Loading states e error handling

## 🚀 Deploy na Vercel

### Deploy Automático

O frontend está configurado para deploy automático na Vercel:

1. **Push para GitHub** → Deploy automático
2. **Preview Deployments** para cada PR
3. **Production Deployment** na branch `main`

### Configuração na Vercel

#### 1. Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Import Project → Selecione o repositório `myndo-test-frontend`
3. Configure o projeto:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### 2. Variáveis de Ambiente

Adicione na Vercel (Settings → Environment Variables):

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://your-ec2-backend:3001` | Production |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | Development |

**Para Backend no EC2:**
```
NEXT_PUBLIC_API_URL=http://ec2-44-222-69-159.compute-1.amazonaws.com:3001
```

ou com DNS personalizado:
```
NEXT_PUBLIC_API_URL=https://api.seu-dominio.com
```

#### 3. Deploy

```bash
# Commit e push
git add .
git commit -m "feat: your feature"
git push origin main

# Vercel faz deploy automaticamente
```

#### 4. Domínio Customizado (Opcional)

1. Vercel Dashboard → Project → Settings → Domains
2. Adicione seu domínio
3. Configure DNS records conforme instruído pela Vercel

### URLs

- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`
- **Custom Domain**: `https://seu-dominio.com`

## 🧪 Testes

### Rodar Testes

```bash
# Todos os testes
npm run test

# Testes em watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Cobertura de Testes

- ✅ Componentes React
- ✅ Funções de API
- ✅ Integração com backend
- ✅ Upload de arquivos
- ✅ Error handling

## 🌐 Variáveis de Ambiente

### Desenvolvimento (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Produção (Vercel)
```env
NEXT_PUBLIC_API_URL=http://seu-backend-ec2:3001
```

⚠️ **IMPORTANTE:** Variáveis que começam com `NEXT_PUBLIC_` são expostas no browser.

## 🔒 Segurança

### CORS no Backend

Configure o backend para aceitar requisições do domínio Vercel:

```typescript
// src/main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://your-project.vercel.app',
    'https://seu-dominio.com'
  ],
  credentials: true,
});
```

### Recomendações

- ✅ Use HTTPS em produção (Vercel fornece automaticamente)
- ✅ Configure CORS no backend
- ✅ Nunca exponha chaves secretas (AWS keys) no frontend
- ✅ Valide inputs no cliente e servidor
- ✅ Use variáveis de ambiente para configurações

## 📱 Estrutura do Projeto

```
myndo-test-frontend/
├── app/
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout raiz
│   └── globals.css           # Estilos globais
├── components/
│   └── (componentes React)   # Componentes reutilizáveis
├── lib/
│   └── api.ts                # Cliente Axios e API calls
├── hooks/
│   └── (custom hooks)        # React hooks customizados
├── __tests__/
│   └── (testes)              # Jest tests
├── public/
│   └── (assets estáticos)    # Imagens, ícones
└── next.config.ts            # Configuração Next.js
```

### Componentes
- Cards responsivos
- Modais acessíveis
- Buttons com estados (hover, loading, disabled)
- Forms com validação visual

## 📝 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento com hot-reload
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # ESLint
npm run test         # Jest tests
npm run test:watch   # Tests em watch mode
```

## 🔄 CI/CD Workflow

```
1. Developer: git push origin main
2. GitHub: Trigger webhook para Vercel
3. Vercel: Build automático
4. Vercel: Rodar testes
5. Vercel: Deploy em produção
6. Vercel: Invalidar cache CDN
7. Deploy completo! 🎉
```

## 🐛 Troubleshooting

### Erro de conexão com API
```bash
# Verifique se o backend está rodando
curl http://seu-backend:3001/cards

# Confirme a URL na Vercel
# Settings → Environment Variables → NEXT_PUBLIC_API_URL
```

### Erro de CORS
```typescript
// No backend (main.ts), adicione o domínio Vercel:
app.enableCors({
  origin: 'https://your-project.vercel.app',
  credentials: true,
});
```

### Build falha na Vercel
```bash
# Verifique logs na Vercel Dashboard
# Geralmente é erro de TypeScript ou variável de ambiente faltando

# Build local para debug
npm run build
```

### Variável de ambiente não funciona
- Certifique-se que começa com `NEXT_PUBLIC_`
- Redeploy após adicionar variáveis
- Use `process.env.NEXT_PUBLIC_API_URL` no código

## 📊 Performance

### Otimizações

- ✅ Automatic Code Splitting (Next.js)
- ✅ Image Optimization (Next.js Image)
- ✅ Edge Network (Vercel CDN)
- ✅ Server-Side Rendering quando apropriado
- ✅ Static Generation para páginas estáticas

### Métricas na Vercel

- **Core Web Vitals** monitorados automaticamente
- **Analytics** disponível no dashboard
- **Logs** de runtime e build

## 🔗 Links Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Vercel](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/react)

## 👨‍💻 Autor

Desenvolvido para o teste técnico Myndo.

## 📄 Licença

UNLICENSED - Projeto privado para avaliação técnica.
