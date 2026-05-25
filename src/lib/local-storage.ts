const isBrowser = typeof window !== 'undefined';

const LocalStorageService = {
    get: <T>(key: string, fallback?: T): T | null => {
        if (!isBrowser) return fallback ?? null;
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : (fallback ?? null);
        } catch {
            return fallback ?? null;
        }
    },

    set: <T>(key: string, value: T): boolean => {
        if (!isBrowser) return false;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    remove: (key: string): void => {
        if (!isBrowser) return;
        try {
            window.localStorage.removeItem(key);
        } catch { }
    },

    clear: (): void => {
        if (!isBrowser) return;
        try {
            window.localStorage.clear();
        } catch { }
    },
};

export default LocalStorageService;