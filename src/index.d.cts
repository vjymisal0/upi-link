export interface UpiLinkOptions {
  pa: string;
  pn?: string;
  am?: number | string;
  cu?: string;
  tn?: string;
  tr?: string;
  mc?: string;
}

export function isValidVpa(value: unknown): boolean;
export function createUpiLink(options: UpiLinkOptions): string;
export function parseUpiLink(link: string): Record<string, string>;
