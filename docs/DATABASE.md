# 📋 Documentação do Banco de Dados

## Tecnologia

**IndexedDB** - API de armazenamento em navegador
- Capacidade: até 50MB por domínio
- Persistente mesmo após fechar o navegador
- Suporta índices e consultas complexas
- Síncrono com transações

## Stores (Tabelas)

### users
```javascript
{
  id: 'uuid',
  name: 'string',
  email: 'string',
  password_hash: 'string', // bcrypt
  avatar: 'blob',
  created_at: 'date',
  updated_at: 'date'
}
```

### incomes
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  person: 'string', // "Gustavo" ou "Esposa"
  description: 'string',
  amount: 'number',
  recurrence: 'string', // "monthly", "one_time"
  due_day: 'number',
  is_active: 'boolean',
  created_at: 'date',
  updated_at: 'date'
}
```

### income_records
```javascript
{
  id: 'uuid',
  income_id: 'uuid',
  user_id: 'uuid',
  amount: 'number',
  date: 'date',
  status: 'string', // "received", "pending"
  created_at: 'date'
}
```

### expenses
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  description: 'string',
  amount: 'number',
  category: 'string',
  subcategory: 'string',
  person: 'string',
  payment_method: 'string', // "pix", "credit", "debit", etc
  bank: 'string',
  date: 'date',
  due_date: 'date',
  is_paid: 'boolean',
  installments: 'number',
  current_installment: 'number',
  credit_card_id: 'uuid',
  notes: 'string',
  tags: ['string'],
  receipt_url: 'string',
  created_at: 'date',
  updated_at: 'date'
}
```

### credit_cards
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  name: 'string',
  bank: 'string',
  last_digits: 'string',
  limit: 'number',
  available_limit: 'number',
  best_purchase_day: 'number',
  due_day: 'number',
  current_invoice: 'number',
  next_invoice: 'number',
  closing_day: 'number',
  is_active: 'boolean',
  created_at: 'date',
  updated_at: 'date'
}
```

### fixed_bills
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  description: 'string',
  category: 'string',
  amount: 'number',
  due_day: 'number',
  payment_method: 'string',
  bank: 'string',
  is_active: 'boolean',
  created_at: 'date',
  updated_at: 'date'
}
```

### financial_goals
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  name: 'string',
  description: 'string',
  target_amount: 'number',
  current_amount: 'number',
  deadline: 'date',
  category: 'string',
  priority: 'string', // "high", "medium", "low"
  status: 'string', // "active", "completed", "abandoned"
  created_at: 'date',
  updated_at: 'date'
}
```

### assets
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  type: 'string', // "real_estate", "vehicle", "investment", etc
  description: 'string',
  amount: 'number',
  purchase_date: 'date',
  notes: 'string',
  created_at: 'date',
  updated_at: 'date'
}
```

### liabilities
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  type: 'string', // "mortgage", "loan", "credit_card", etc
  description: 'string',
  amount: 'number',
  due_date: 'date',
  interest_rate: 'number',
  notes: 'string',
  created_at: 'date',
  updated_at: 'date'
}
```

### budgets
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  category: 'string',
  limit_amount: 'number',
  month: 'date',
  alert_percentage: 'number', // 80
  created_at: 'date',
  updated_at: 'date'
}
```

### emergency_fund
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  current_amount: 'number',
  target_amount: 'number',
  monthly_contribution: 'number',
  months_of_expenses: 'number',
  created_at: 'date',
  updated_at: 'date'
}
```

### analytics
```javascript
{
  id: 'uuid',
  user_id: 'uuid',
  month: 'date',
  total_income: 'number',
  total_expenses: 'number',
  savings: 'number',
  savings_rate: 'number',
  by_category: 'object',
  by_person: 'object',
  by_payment_method: 'object',
  created_at: 'date'
}
```

## Índices

Cada store tem índices para queries rápidas:

- **expenses**: user_id, date, category, person, credit_card_id
- **incomes**: user_id, due_day, is_active
- **financial_goals**: user_id, status
- **assets**: user_id, type
- **analytics**: user_id, month

## Backup e Sincronização

### Backup Automático
- Salvo em JSON a cada hora
- Armazenado em LocalStorage
- Disponível para download

### Sincronização (Futuro)
- Quando integrado com backend
- Sincronização bidirecional
- Resolução de conflitos
- Sincronização offline

## Migrações

Quando mudar a estrutura do banco:
1. Versionar o schema
2. Criar função de migração
3. Executar ao abrir a app
4. Testar com backup

## Limpeza de Dados

- Dados com mais de 2 anos: compactação automática
- Deletar dados do usuário: limpeza completa
- Limpar cache: manual via settings