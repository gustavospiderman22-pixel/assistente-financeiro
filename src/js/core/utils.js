/**
 * 🔨 UTILS.JS - Utilitários e funções auxiliares
 * Formatação, validação, cálculos e ferramentas gerais
 */

class Utils {
  /**
   * Gerar UUID v4
   */
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Validar email
   */
  static isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Validar senha (mínimo 6 caracteres)
   */
  static isValidPassword(password) {
    return password && password.length >= 6;
  }

  /**
   * Formatar moeda (BRL)
   */
  static formatCurrency(value, currency = 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(value);
  }

  /**
   * Formatar número
   */
  static formatNumber(value, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  /**
   * Formatar data
   */
  static formatDate(date, format = 'DD/MM/YYYY') {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
    if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
    if (format === 'MM/DD/YYYY') return `${month}/${day}/${year}`;

    return `${day}/${month}/${year}`; // Default
  }

  /**
   * Formatar hora
   */
  static formatTime(date) {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Formatar data e hora completa
   */
  static formatDateTime(date) {
    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  }

  /**
   * Calcular diferença de datas em dias
   */
  static daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Obter primeiro dia do mês
   */
  static getFirstDayOfMonth(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  /**
   * Obter último dia do mês
   */
  static getLastDayOfMonth(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  /**
   * Obter primeiro dia do ano
   */
  static getFirstDayOfYear(date = new Date()) {
    return new Date(date.getFullYear(), 0, 1);
  }

  /**
   * Obter último dia do ano
   */
  static getLastDayOfYear(date = new Date()) {
    return new Date(date.getFullYear(), 11, 31);
  }

  /**
   * Verificar se é um número válido
   */
  static isValidNumber(value) {
    return !isNaN(value) && isFinite(value);
  }

  /**
   * Converter string em número
   */
  static parseNumber(value) {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/[^0-9.-]/g, ''));
    }
    return parseFloat(value);
  }

  /**
   * Truncar string
   */
  static truncate(str, length = 50) {
    if (str.length > length) {
      return str.substring(0, length) + '...';
    }
    return str;
  }

  /**
   * Capitalizar primeira letra
   */
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Sanitizar HTML (básico)
   */
  static sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Debounce function
   */
  static debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function
   */
  static throttle(func, limit = 1000) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Fazer uma cópia profunda de um objeto
   */
  static deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Mesclar dois objetos
   */
  static mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }

  /**
   * Gerar hash simples (não criptográfico)
   */
  static simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Converter para 32-bit
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Delay assíncrono
   */
  static async delay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Log com timestamp
   */
  static log(message, type = 'info') {
    const timestamp = this.formatDateTime(new Date());
    const prefix = `[${timestamp}] [${type.toUpperCase()}]`;

    switch (type) {
      case 'error':
        console.error(`${prefix} ${message}`);
        break;
      case 'warn':
        console.warn(`${prefix} ${message}`);
        break;
      case 'success':
        console.log(`%c${prefix} ${message}`, 'color: green; font-weight: bold;');
        break;
      default:
        console.log(`${prefix} ${message}`);
    }
  }
}

// Export
const utils = Utils;
