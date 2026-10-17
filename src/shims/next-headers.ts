export async function cookies() {
  return {
    getAll() {
      if (typeof document === 'undefined') return [];
      return document.cookie.split('; ').filter(Boolean).map(c => {
        const [name, ...v] = c.split('=');
        return { name, value: v.join('=') };
      });
    },
    set() {},
    setAll() {}
  };
}
