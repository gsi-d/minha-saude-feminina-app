# 🌸 Ciclo+

> Tecnologia, cuidado e informação para acompanhar cada fase da saúde feminina.

O **Ciclo+** é um aplicativo mobile desenvolvido para auxiliar mulheres no acompanhamento do ciclo menstrual, monitoramento de sintomas, bem-estar e acesso à informação sobre saúde feminina de forma prática, intuitiva e segura.

O aplicativo busca unir tecnologia, prevenção e autocuidado em uma única plataforma, oferecendo ferramentas inteligentes para monitoramento da saúde e apoio à usuária no dia a dia.

---

# 🎯 Objetivo do Projeto

O objetivo do **Ciclo+** é oferecer uma plataforma acessível e segura para acompanhamento da saúde feminina, auxiliando no monitoramento do ciclo menstrual, sintomas ginecológicos, hábitos saudáveis e acesso à informação preventiva.

Além disso, o aplicativo busca incentivar:
- o autocuidado;
- a prevenção;
- a educação em saúde;
- o acompanhamento contínuo da saúde da mulher.

---

# ✨ Funcionalidades

## 🔐 Autenticação

- Cadastro de usuária
- Login seguro
- Persistência de sessão
- Armazenamento em nuvem
- Criptografia de dados

---

## 💬 Fórum Anônimo

Espaço seguro para interação entre usuárias:

- Criação de posts anônimos
- Perguntas e respostas
- Compartilhamento de experiências
- Apoio da comunidade

---

## 💖 Bem-estar

Checklist diário voltado ao autocuidado:

### 🏃 Movimento
- Controle de atividades físicas

### 💧 Hidratação
- Contador diário de água

### 💤 Descanso
- Registro da qualidade do sono

### 📌 Dica do Dia
- Orientações rápidas sobre saúde feminina

---

## 📚 Conteúdos Educativos

Acesso a conteúdos sobre:

- Saúde ginecológica
- Ciclo menstrual
- TPM
- Climatério
- Menopausa
- Saúde urinária
- Prevenção
- Autocuidado

---

# 🚀 Diferenciais do Projeto

- 🔒 Privacidade e anonimato
- 📊 Monitoramento inteligente
- 🩺 Alertas automáticos
- 🌸 Interface intuitiva
- 💬 Fórum seguro
- ☁️ Sincronização em nuvem
- 📱 Experiência mobile moderna
- ❤️ Foco em prevenção e educação

---

# ⏳ Atualizações futuras

## 🚨 Alertas Inteligentes

O sistema reage às informações registradas pela usuária:

- Alertas de atraso menstrual
- Alertas de sintomas persistentes
- Sugestão de procura médica
- Lembretes preventivos
- Monitoramento de possíveis sinais de risco

---

## 📅 Calendário Inteligente

O calendário funciona como um diário visual da usuária, permitindo:

- Registro do ciclo menstrual
- Controle da duração e intensidade do fluxo
- Registro de atrasos menstruais
- Monitoramento de sintomas
- Registro de humor
- Registro de sangramentos fora do período
- Controle de climatério e menopausa
- Histórico completo de eventos

---

# 🧠 Arquitetura do Sistema

O sistema utiliza arquitetura client-server.

## Frontend Mobile
- React Native
- Expo

## Backend
- Node.js
- Express.js

## Banco de Dados
- PostgreSQL

## Autenticação
- JWT
- Criptografia de dados

---

# 🛠️ Tecnologias Utilizadas

## Mobile
- React Native
- Expo
- React Navigation

## Backend
- Node.js
- Express

## Banco de Dados
- PostgreSQL

## Ferramentas
- Git
- GitHub
- Figma
- Supabase

---

# ⚙️ Fonte de Dados

O app agora suporta duas fontes de dados:

- `memory`: usa o banco fake em memória para desenvolvimento de layout e fluxo
- `supabase`: usa o backend real via Supabase

Crie um arquivo `.env` na raiz do projeto a partir do `.env.example`:

```env
EXPO_PUBLIC_DATA_SOURCE=memory
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Para continuar usando dados fake:

```env
EXPO_PUBLIC_DATA_SOURCE=memory
```

Para trocar para Supabase:

```env
EXPO_PUBLIC_DATA_SOURCE=supabase
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

---

# 🔄 Fluxo de Navegação

```text
Login
   ↓
Home
   ↓
Calendário
   ↓
Registro de Sintomas
   ↓
Alertas Inteligentes
   ↓
Conteúdos e Recomendações
