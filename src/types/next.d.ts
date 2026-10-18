declare module 'next/navigation' {
  export function redirect(url: string): never;
  export function useRouter(): { push: (url: string) => void; replace: (url: string) => void; refresh: () => void; back: () => void };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/headers' {
  export function cookies(): Promise<{
    getAll(): { name: string; value: string }[];
    set(name: string, value: string, options?: any): void;
    setAll(cookies: { name: string; value: string; options?: any }[]): void;
  }>;
  export function headers(): Promise<Headers>;
}

declare module 'next/server' {
  export class NextResponse {
    static next(init?: any): NextResponse;
    static redirect(url: string | URL, init?: any): NextResponse;
    static json(body: any, init?: any): NextResponse;
    cookies: any;
  }
  export type NextRequest = Request & {
    nextUrl: URL;
    cookies: any;
  };
}

declare module 'next/cache' {
  export function revalidatePath(path: string, type?: 'page' | 'layout'): void;
  export function revalidateTag(tag: string): void;
}
