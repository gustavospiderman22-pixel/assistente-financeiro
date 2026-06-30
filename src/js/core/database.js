/**
 * 💾 DATABASE.JS - Sistema de banco de dados com IndexedDB
 * Gerencia toda a persistência de dados da aplicação
 */

class Database {
  constructor() {
    this.db = null;
    this.dbName = 'FinancialAssistant';
    this.version = 1;
    this.stores = [
      'users',
      'incomes',
      'income_records',
      'expenses',
      'credit_cards',
      'fixed_bills',
      'financial_goals',
      'assets',
      'liabilities',
      'budgets',
      'emergency_fund',
      'analytics'
    ];
  }

  /**
   * Inicializa o banco de dados
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Erro ao abrir banco de dados:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('Banco de dados inicializado com sucesso');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        this.createStores(db);
      };
    });
  }

  /**
   * Cria os stores no banco de dados
   */
  createStores(db) {
    // Users
    if (!db.objectStoreNames.contains('users')) {
      const usersStore = db.createObjectStore('users', { keyPath: 'id' });
      usersStore.createIndex('email', 'email', { unique: true });
      usersStore.createIndex('created_at', 'created_at');
    }

    // Incomes
    if (!db.objectStoreNames.contains('incomes')) {
      const incomesStore = db.createObjectStore('incomes', { keyPath: 'id' });
      incomesStore.createIndex('user_id', 'user_id');
      incomesStore.createIndex('due_day', 'due_day');
      incomesStore.createIndex('is_active', 'is_active');
    }

    // Income Records
    if (!db.objectStoreNames.contains('income_records')) {
      const recordsStore = db.createObjectStore('income_records', { keyPath: 'id' });
      recordsStore.createIndex('user_id', 'user_id');
      recordsStore.createIndex('income_id', 'income_id');
      recordsStore.createIndex('date', 'date');
    }

    // Expenses
    if (!db.objectStoreNames.contains('expenses')) {
      const expensesStore = db.createObjectStore('expenses', { keyPath: 'id' });
      expensesStore.createIndex('user_id', 'user_id');
      expensesStore.createIndex('date', 'date');
      expensesStore.createIndex('category', 'category');
      expensesStore.createIndex('person', 'person');
      expensesStore.createIndex('credit_card_id', 'credit_card_id');
    }

    // Credit Cards
    if (!db.objectStoreNames.contains('credit_cards')) {
      const cardsStore = db.createObjectStore('credit_cards', { keyPath: 'id' });
      cardsStore.createIndex('user_id', 'user_id');
      cardsStore.createIndex('bank', 'bank');
    }

    // Fixed Bills
    if (!db.objectStoreNames.contains('fixed_bills')) {
      const billsStore = db.createObjectStore('fixed_bills', { keyPath: 'id' });
      billsStore.createIndex('user_id', 'user_id');
      billsStore.createIndex('due_day', 'due_day');
    }

    // Financial Goals
    if (!db.objectStoreNames.contains('financial_goals')) {
      const goalsStore = db.createObjectStore('financial_goals', { keyPath: 'id' });
      goalsStore.createIndex('user_id', 'user_id');
      goalsStore.createIndex('status', 'status');
    }

    // Assets
    if (!db.objectStoreNames.contains('assets')) {
      const assetsStore = db.createObjectStore('assets', { keyPath: 'id' });
      assetsStore.createIndex('user_id', 'user_id');
      assetsStore.createIndex('type', 'type');
    }

    // Liabilities
    if (!db.objectStoreNames.contains('liabilities')) {
      const liabilitiesStore = db.createObjectStore('liabilities', { keyPath: 'id' });
      liabilitiesStore.createIndex('user_id', 'user_id');
      liabilitiesStore.createIndex('type', 'type');
    }

    // Budgets
    if (!db.objectStoreNames.contains('budgets')) {
      const budgetsStore = db.createObjectStore('budgets', { keyPath: 'id' });
      budgetsStore.createIndex('user_id', 'user_id');
      budgetsStore.createIndex('month', 'month');
    }

    // Emergency Fund
    if (!db.objectStoreNames.contains('emergency_fund')) {
      const fundStore = db.createObjectStore('emergency_fund', { keyPath: 'id' });
      fundStore.createIndex('user_id', 'user_id');
    }

    // Analytics
    if (!db.objectStoreNames.contains('analytics')) {
      const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id' });
      analyticsStore.createIndex('user_id', 'user_id');
      analyticsStore.createIndex('month', 'month');
    }
  }

  /**
   * CRUD - CREATE (Inserir)
   */
  async create(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * CRUD - READ (Ler)
   */
  async read(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * CRUD - UPDATE (Atualizar)
   */
  async update(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * CRUD - DELETE (Deletar)
   */
  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Buscar todos os registros de um store
   */
  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Buscar por índice
   */
  async getByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Deletar todos os registros de um store
   */
  async clearStore(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Deletar banco de dados inteiro
   */
  async deleteDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this.dbName);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// Export da classe
const db = new Database();
