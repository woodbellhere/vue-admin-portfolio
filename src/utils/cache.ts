class LocalCache {
  setCache(key: string, value: any) {
    globalThis.localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    const value = globalThis.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string) {
    globalThis.localStorage.removeItem(key);
  }

  clearCache() {
    globalThis.localStorage.clear();
  }
}

export default new LocalCache();
