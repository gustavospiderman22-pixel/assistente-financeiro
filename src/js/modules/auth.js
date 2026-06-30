/**
 * 🔑 AUTH.JS - Módulo de autenticação
 * Gerencia login, registr e validação de usuários
 */

class Auth {
  constructor() {
    this.users = [];
  }

  /**
   * Inicializar módulo de autenticação
   */
  async init() {
    this.users = await db.getAll('users');
  }

  /**
   * Registrar novo usuário
   */
  async register(name, email, password) {
    // Validar dados
    if (!this.validateName(name)) {
      throw new Error('Nome inválido');
    }
    if (!Utils.isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    if (!Utils.isValidPassword(password)) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    // Verificar se email já existe
    const existingUser = await db.getByIndex('users', 'email', email);
    if (existingUser.length > 0) {
      throw new Error('Este email já está registrado');
    }

    // Criar novo usuário
    const user = {
      id: Utils.generateUUID(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password_hash: await this.hashPassword(password),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Salvar no banco
    const userId = await db.create('users', user);
    console.log('✅ Usuário registrado com sucesso');

    // Fazer login automático
    await this.login(email, password);

    return user;
  }

  /**
   * Fazer login
   */
  async login(email, password) {
    // Validar dados
    if (!Utils.isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    if (!password) {
      throw new Error('Senha é obrigatória');
    }

    // Buscar usuário
    const users = await db.getByIndex('users', 'email', email.toLowerCase());
    if (users.length === 0) {
      throw new Error('Email ou senha incorretos');
    }

    const user = users[0];

    // Verificar senha
    const passwordValid = await this.verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      throw new Error('Email ou senha incorretos');
    }

    // Salvar sessão
    storage.setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      logged_at: new Date().toISOString()
    });

    // Gerar token (simples)
    const token = Utils.simpleHash(user.id + new Date().getTime());
    storage.setAuthToken(token);

    console.log('✅ Login realizado com sucesso');
    return user;
  }

  /**
   * Fazer logout
   */
  logout() {
    storage.clearSession();
    storage.removeItem('authToken');
    console.log('✅ Logout realizado com sucesso');
  }

  /**
   * Validar nome
   */
  validateName(name) {
    return name && name.trim().length >= 3;
  }

  /**
   * Hash simples de senha (usar bcrypt em produção)
   */
  async hashPassword(password) {
    // Em produção, usar bcrypt ou similar
    // Aqui é apenas simulação
    return await this.simpleHash(password);
  }

  /**
   * Verificar senha
   */
  async verifyPassword(password, hash) {
    const passwordHash = await this.simpleHash(password);
    return passwordHash === hash;
  }

  /**
   * Hash simples (não criptográfico, apenas para demo)
   */
  async simpleHash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Verificar se está autenticado
   */
  isAuthenticated() {
    return storage.isAuthenticated();
  }

  /**
   * Obter usuário atual
   */
  getCurrentUser() {
    return storage.getCurrentUser();
  }
}

// Export
const auth = new Auth();
