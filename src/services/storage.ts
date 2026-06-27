const STORAGE_PREFIX = 'takumi';

export function readStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const value = window.localStorage.getItem(`${STORAGE_PREFIX}:${key}`);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(`${STORAGE_PREFIX}:${key}`, JSON.stringify(value));
}

export function clearStored(key: string): void {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(`${STORAGE_PREFIX}:${key}`);
}
