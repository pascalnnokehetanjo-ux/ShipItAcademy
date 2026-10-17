export function redirect(url: string): never {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
  throw new Error(`NEXT_REDIRECT:${url}`);
}
