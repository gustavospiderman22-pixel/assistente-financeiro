# 🏗️ Arquitetura do Sistema

## Visão Geral

O Assistente Financeiro Pessoal é um aplicativo web de página única (SPA) que funciona completamente no navegador, armazenando dados localmente em IndexedDB.

## Camadas da Aplicação

### 1. Apresentação (UI Layer)
- HTML5 semântico
- CSS3 com variáveis de tema
- Componentes reutilizáveis
- Responsivo (mobile-first)

### 2. Lógica de Negócio (Business Logic)
- Módulos independentes para cada funcionalidade
- Services para cálculos e análises
- Validações de dados
- Regras de negócio financeiro

### 3. Dados (Data Layer)
- IndexedDB para persistência
- LocalStorage para preferências
- Cache em memória
- Backup em JSON

## Fluxo de Dados

```
UI Component
    ↓
Event Handler (js/app.js)
    ↓
Module Logic (js/modules/)
    ↓
Business Rules (js/services/)
    ↓
Database Operations (js/core/database.js)
    ↓
IndexedDB
    ↓
[Atualização em cascata]
    ↓
UI Refresh
```

## Módulos

### Core
- **database.js** - Operações CRUD com IndexedDB
- **storage.js** - LocalStorage e cache
- **utils.js** - Utilitários (formatação, validação, etc.)

### Modules
- **auth.js** - Autenticação e usuários
- **dashboard.js** - Dashboard executivo
- **income.js** - Receitas
- **expenses.js** - Despesas
- **creditCards.js** - Cartões de crédito
- **fixedBills.js** - Contas fixas
- **goals.js** - Metas financeiras
- **patrimony.js** - Patrimônio
- **budget.js** - Orçamento mensal
- **emergencyFund.js** - Reserva de emergência
- **reports.js** - Relatórios
- **analytics.js** - Análises

### Components
- **sidebar.js** - Menu lateral
- **topbar.js** - Barra superior
- **modal.js** - Modais e diálogos
- **chart.js** - Componente de gráfico
- **notifications.js** - Sistema de notificações

### Services
- **calculatorService.js** - Cálculos financeiros
- **analysisService.js** - Análise de dados
- **forecastService.js** - Previsões
- **importExportService.js** - Import/Export

## Padrões de Design

### MVC-like Pattern
Cada módulo segue:
- **Model**: Dados e estrutura
- **View**: Renderização HTML
- **Controller**: Lógica de interação

### Service Pattern
Operações complexas são encapsuladas em services

### Observer Pattern
Atualização automática de componentes quando dados mudam

### Singleton Pattern
Instâncias únicas de services globais

## Segurança

- Validação de inputs
- Sanitização de dados
- Criptografia de senha (bcrypt no backend futuro)
- CORS (quando integrado com API)
- Rate limiting (futuro)

## Performance

- Lazy loading de módulos
- Cache agressivo
- Indexação de banco de dados
- Debouncing de eventos
- Virtualização de listas grandes
- Service Workers (PWA futuro)

## Escalabilidade

- Arquitetura modular e independente
- Fácil adição de novos módulos
- Preparado para migração para backend
- API pronta para integração
- Suporta múltiplos usuários (futuro)