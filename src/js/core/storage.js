/**
 * 📋 STORAGE.JS - Sistema de armazenamento local (LocalStorage e Cache)
 * Gerencia preferências, configurações e cache rápido
 */

class Storage {
  constructor() {
    this.prefix = 'FA_'; // Financial Assistant prefix
  }

  /**
   * Salvar dados no LocalStorage
   */
  setItem(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, serialized);
      return true;
    } catch (error) {
      console.error('Erro ao salvar no LocalStorage:', error);
      return false;
    }
  }

  /**
   * Recuperar dados do LocalStorage
   */
  getItem(key) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Erro ao recuperar do LocalStorage:', error);
      return null;
    }
  }

  /**
   * Remover dados do LocalStorage
   */
  removeItem(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error('Erro ao remover do LocalStorage:', error);
      return false;
    }
  }

  /**
   * Limpar tudo do LocalStorage (apenas com prefix da app)
   */
  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Erro ao limpar LocalStorage:', error);
      return false;
    }
  }

  /**
   * Salvar preferências do usuário
   */
  setUserPreferences(userId, prefs) {
    return this.setItem(`prefs_${userId}`, {
      theme: prefs.theme || 'theme-purple',
      language: prefs.language || 'pt-BR',
      currency: prefs.currency || 'BRL',
      notifications: prefs.notifications ?? true,
      dateFormat: prefs.dateFormat || 'DD/MM/YYYY',
      updated_at: new Date().toISOString()
    });
  }

  /**
   * Recuperar preferências do usuário
   */
  getUserPreferences(userId) {
    const defaults = {
      theme: 'theme-purple',
      language: 'pt-BR',
      currency: 'BRL',
      notifications: true,
      dateFormat: 'DD/MM/YYYY'
    };
    return this.getItem(`prefs_${userId}`) || defaults;
  }

  /**
   * Salvar usuário autenticado
   */
  setCurrentUser(user) {
    return this.setItem('currentUser', {
      id: user.id,
      name: user.name,
      email: user.email,
      logged_at: new Date().toISOString()
    });
  }

  /**
   * Recuperar usuário autenticado
   */
  getCurrentUser() {
    return this.getItem('currentUser');
  }

  /**
   * Limpar sessão do usuário
   */
  clearSession() {
    this.removeItem('currentUser');
    return true;
  }

  /**
   * Salvar token de autenticação
   */
  setAuthToken(token, expiresIn = 86400000) {
    const expires = new Date().getTime() + expiresIn;
    return this.setItem('authToken', {
      token,
      expires,
      created_at: new Date().toISOString()
    });
  }

  /**
   * Recuperar token de autenticação
   */
  getAuthToken() {
    const auth = this.getItem('authToken');
    if (!auth) return null;

    // Verificar se expirou
    if (new Date().getTime() > auth.expires) {
      this.removeItem('authToken');
      return null;
    }

    return auth.token;
  }

  /**
   * Verificar se está autenticado
   */
  isAuthenticated() {
    return !!this.getAuthToken() && !!this.getCurrentUser();
  }

  /**
   * Salvar cache de dados
   */
  setCache(key, data, ttl = 3600000) {
    // TTL padrão: 1 hora
    const expires = new Date().getTime() + ttl;
    return this.setItem(`cache_${key}`, {
      data,
      expires,
      created_at: new Date().toISOString()
    });
  }

  /**
   * Recuperar cache
   */
  getCache(key) {
    const cached = this.getItem(`cache_${key}`);
    if (!cached) return null;

    // Verificar se expirou
    if (new Date().getTime() > cached.expires) {
      this.removeItem(`cache_${key}`);
      return null;
    }

    return cached.data;
  }

  /**
   * Limpar cache
   */
  clearCache() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes(this.prefix + 'cache_')) {
        localStorage.removeItem(key);
      }
    });
    return true;
  }
}

// Export
const storage = new Storage();
