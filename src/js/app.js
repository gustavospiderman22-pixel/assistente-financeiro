/**
 * 🎯 APP.JS - Inicializador principal da aplicação
 * Orquestra toda a inicialização e navegação
 */

class App {
  constructor() {
    this.currentPage = 'dashboard';
    this.currentUser = null;
    this.isReady = false;
  }

  /**
   * Inicializar aplicación
   */
  async init() {
    try {
      console.log('🚀 Iniciando Assistente Financeiro...');

      // 1. Inicializar banco de dados
      await db.init();
      console.log('✅ Banco de dados inicializado');

      // 2. Verificar se usuário está autenticado
      this.currentUser = storage.getCurrentUser();
      if (!this.currentUser) {
        this.redirectToLogin();
        return;
      }

      console.log(`✅ Usuário autenticado: ${this.currentUser.name}`);

      // 3. Aplicar tema salvo
      this.applyTheme();

      // 4. Inicializar componentes
      sidebar.init();
      topbar.init();
      console.log('✅ Componentes inicializados');

      // 5. Configurar event listeners
      this.setupEventListeners();

      // 6. Carregar página inicial
      await this.loadPage('dashboard');

      this.isReady = true;
      console.log('✅ Aplicação pronta para usar!');

      // Mostrar mensagem de boas-vindas
      setTimeout(() => {
        topbar.addNotification({
          title: `Bem-vindo, ${this.currentUser.name}! 👋`,
          message: 'Sua aplicação financeira está pronta',
          type: 'success'
        });
      }, 500);
    } catch (error) {
      console.error('❌ Erro ao inicializar aplicação:', error);
      Modal.alert('Erro ao inicializar a aplicação. Tente recarregar a página.', 'danger');
    }
  }

  /**
   * Configurar event listeners globais
   */
  setupEventListeners() {
    // Event de navegação
    window.addEventListener('navigate', (e) => {
      const page = e.detail.page;
      this.loadPage(page);
    });

    // Detectar mudança de tema
    document.addEventListener('themeChange', (e) => {
      const theme = e.detail.theme;
      this.changeTheme(theme);
    });
  }

  /**
   * Carregar página
   */
  async loadPage(page) {
    try {
      this.currentPage = page;
      const contentArea = document.getElementById('content-area');

      if (!contentArea) return;

      // Mostrar loading
      contentArea.innerHTML = '<div class="flex-center" style="height: 400px;"><div class="spinner"></div></div>';

      // Simular delay (remover em produção)
      await Utils.delay(300);

      // Carregar conteúdo da página
      let content = '';

      switch (page) {
        case 'dashboard':
          content = this.getDashboardContent();
          break;
        case 'income':
          content = this.getIncomeContent();
          break;
        case 'expenses':
          content = this.getExpensesContent();
          break;
        case 'credit-cards':
          content = this.getCreditCardsContent();
          break;
        case 'fixed-bills':
          content = this.getFixedBillsContent();
          break;
        case 'goals':
          content = this.getGoalsContent();
          break;
        case 'patrimony':
          content = this.getPatrimonyContent();
          break;
        case 'budget':
          content = this.getBudgetContent();
          break;
        case 'emergency-fund':
          content = this.getEmergencyFundContent();
          break;
        case 'reports':
          content = this.getReportsContent();
          break;
        case 'settings':
          content = this.getSettingsContent();
          break;
        default:
          content = this.getDashboardContent();
      }

      contentArea.innerHTML = content;
      sidebar.setActive(`nav-${page}`);

      console.log(`📄 Página carregada: ${page}`);
    } catch (error) {
      console.error('Erro ao carregar página:', error);
      document.getElementById('content-area').innerHTML = `
        <div class="container-lg">
          <div class="alert alert-danger">
            <strong>Erro!</strong> Não foi possível carregar a página solicitada.
          </div>
        </div>
      `;
    }
  }

  /**
   * Conteúdo do Dashboard
   */
  getDashboardContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Dashboard</h1>
        <p class="text-muted">Página inicial com resumo de finanças</p>
        
        <div class="grid grid-4 mb-md mt-md">
          <div class="kpi-card animate-fade-in">
            <div class="kpi-label">💰 Renda Total</div>
            <div class="kpi-value">R$ 0,00</div>
            <div class="kpi-change">Este mês</div>
          </div>
          <div class="kpi-card animate-fade-in">
            <div class="kpi-label">📊 Despesas</div>
            <div class="kpi-value">R$ 0,00</div>
            <div class="kpi-change">Este mês</div>
          </div>
          <div class="kpi-card animate-fade-in">
            <div class="kpi-label">💎 Saldo</div>
            <div class="kpi-value">R$ 0,00</div>
            <div class="kpi-change">Disponível</div>
          </div>
          <div class="kpi-card animate-fade-in">
            <div class="kpi-label">🏠 Patrimônio</div>
            <div class="kpi-value">R$ 0,00</div>
            <div class="kpi-change">Total</div>
          </div>
        </div>
        
        <div class="alert alert-info mt-md">
          <strong>🌟 Díca:</strong> Comece adicionando suas receitas e despesas para ver os dados no dashboard!
        </div>
      </div>
    `;
  }

  /**
   * Conteúdo - Receitas
   */
  getIncomeContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Receitas</h1>
        <button class="btn btn-primary mb-md">➕ Adicionar Receita</button>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Suas Receitas</h3></div>
          <table><thead><tr><th>Descrição</th><th>Valor</th><th>Data</th><th>Ações</th></tr></thead>
          <tbody><tr><td colspan="4" class="text-center text-muted py-lg">Nenhuma receita registrada</td></tr></tbody></table>
        </div>
      </div>
    `;
  }

  /**
   * Conteúdo - Despesas
   */
  getExpensesContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Despesas</h1>
        <button class="btn btn-primary mb-md">➕ Adicionar Despesa</button>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Suas Despesas</h3></div>
          <table><thead><tr><th>Descrição</th><th>Valor</th><th>Categoria</th><th>Data</th><th>Ações</th></tr></thead>
          <tbody><tr><td colspan="5" class="text-center text-muted py-lg">Nenhuma despesa registrada</td></tr></tbody></table>
        </div>
      </div>
    `;
  }

  /**
   * Conteúdo - Cartões de Crédito
   */
  getCreditCardsContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Cartões de Crédito</h1>
        <button class="btn btn-primary mb-md">➕ Adicionar Cartão</button>
        <div class="grid grid-2">
          <div class="alert alert-info"><p>Nenhum cartão registrado. Adicione seus cartões para rastrear gastos.</p></div>
        </div>
      </div>
    `;
  }

  /**
   * Conteúdo - Contas Fixas
   */
  getFixedBillsContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Contas Fixas</h1>
        <button class="btn btn-primary mb-md">➕ Adicionar Conta</button>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Suas Contas Fixas</h3></div>
          <table><thead><tr><th>Descrição</th><th>Valor</th><th>Vencimento</th><th>Ações</th></tr></thead>
          <tbody><tr><td colspan="4" class="text-center text-muted py-lg">Nenhuma conta fixa registrada</td></tr></tbody></table>
        </div>
      </div>
    `;
  }

  /**
   * Conteúdo - Metas
   */
  getGoalsContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Metas Financeiras</h1>
        <button class="btn btn-primary mb-md">➕ Nova Meta</button>
        <div class="alert alert-info"><p>Defina suas metas financeiras e acompanhe o progresso!</p></div>
      </div>
    `;
  }

  /**
   * Conteúdo - Patrimônio
   */
  getPatrimonyContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Patrimônio</h1>
        <button class="btn btn-primary mb-md">➕ Adicionar Ativo</button>
        <div class="grid grid-2">
          <div class="card">
            <div class="card-header"><h3 class="card-title">Ativos</h3></div>
            <table><thead><tr><th>Descrição</th><th>Valor</th></tr></thead>
            <tbody><tr><td colspan="2" class="text-center text-muted py-lg">Nenhum ativo</td></tr></tbody></table>
          </div>
          <div class="card">
            <div class="card-header"><h3 class="card-title">Dívidas</h3></div>
            <table><thead><tr><th>Descrição</th><th>Valor</th></tr></thead>
            <tbody><tr><td colspan="2" class="text-center text-muted py-lg">Nenhuma dívida</td></tr></tbody></table>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Conteúdo - Orçamento
   */
  getBudgetContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Orçamento Mensal</h1>
        <button class="btn btn-primary mb-md">➕ Novo Orçamento</button>
        <div class="alert alert-info"><p>Estabeleça limites de gasto por categoria.</p></div>
      </div>
    `;
  }

  /**
   * Conteúdo - Fundo de Emergência
   */
  getEmergencyFundContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Fundo de Emergência</h1>
        <div class="card mt-md">
          <div class="card-header"><h3 class="card-title">Status do Fundo</h3></div>
          <div class="p-lg">
            <p class="mb-md"><strong>Meta:</strong> R$ 0,00</p>
            <p class="mb-md"><strong>Atual:</strong> R$ 0,00</p>
            <div style="width: 100%; height: 20px; background: var(--surface-light); border-radius: 10px; overflow: hidden;">
              <div style="width: 0%; height: 100%; background: var(--primary);"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Conteúdo - Relatórios
   */
  getReportsContent() {
    return `
      <div class="container-lg">
        <h1 class="mb-md">Relatórios</h1>
        <div class="grid grid-2">
          <div class="card">
            <div class="card-header"><h3 class="card-title">Relatório Mensal</h3></div>
            <button class="btn btn-primary btn-sm mt-md">Gerar Relatório</button>
          </div>
          <div class="card">
            <div class="card-header"><h3 class="card-title">Relatório Anual</h3></div>
            <button class="btn btn-primary btn-sm mt-md">Gerar Relatório</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Conteúdo - Configurações
   */
  getSettingsContent() {
    const prefs = storage.getUserPreferences(this.currentUser.id);
    return `
      <div class="container-lg">
        <h1 class="mb-md">Configurações</h1>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Preferências</h3></div>
          <div class="form-group mt-md">
            <label>Tema</label>
            <select id="theme-select" style="max-width: 200px;">
              <option value="theme-purple" ${prefs.theme === 'theme-purple' ? 'selected' : ''}>Roxo</option>
              <option value="theme-blue" ${prefs.theme === 'theme-blue' ? 'selected' : ''}>Azul</option>
              <option value="theme-green" ${prefs.theme === 'theme-green' ? 'selected' : ''}>Verde</option>
              <option value="theme-orange" ${prefs.theme === 'theme-orange' ? 'selected' : ''}>Laranja</option>
            </select>
          </div>
          <div class="form-group">
            <label>Moeda</label>
            <select id="currency-select" style="max-width: 200px;">
              <option value="BRL" ${prefs.currency === 'BRL' ? 'selected' : ''}>BRL - Real</option>
              <option value="USD" ${prefs.currency === 'USD' ? 'selected' : ''}>USD - Dólar</option>
              <option value="EUR" ${prefs.currency === 'EUR' ? 'selected' : ''}>EUR - Euro</option>
            </select>
          </div>
          <button class="btn btn-primary mt-md">Salvar Preferências</button>
        </div>
      </div>
    `;
  }

  /**
   * Aplicar tema salvo
   */
  applyTheme() {
    const prefs = storage.getUserPreferences(this.currentUser.id);
    const theme = prefs.theme || 'theme-purple';
    document.documentElement.classList.add(theme);
  }

  /**
   * Mudar tema
   */
  changeTheme(theme) {
    document.documentElement.classList.remove('theme-purple', 'theme-blue', 'theme-green', 'theme-orange');
    document.documentElement.classList.add(theme);
    
    const prefs = storage.getUserPreferences(this.currentUser.id);
    prefs.theme = theme;
    storage.setUserPreferences(this.currentUser.id, prefs);
  }

  /**
   * Redirecionar para login
   */
  redirectToLogin() {
    window.location.href = 'login.html';
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  window.app = app; // Expor globalmente para debug
  app.init();
});
