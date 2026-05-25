import { describe, it, expect, vi, beforeEach } from 'vitest';
import LocalStorageService from '../local-storage';

describe('LocalStorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('get', () => {
    it('returns parsed value if item exists in localStorage', () => {
      localStorage.setItem('testKey', JSON.stringify({ a: 1 }));
      const result = LocalStorageService.get('testKey');
      expect(result).toEqual({ a: 1 });
    });

    it('returns null if item does not exist and no fallback provided', () => {
      const result = LocalStorageService.get('missingKey');
      expect(result).toBeNull();
    });

    it('returns fallback if item does not exist', () => {
      const result = LocalStorageService.get('missingKey', 'default');
      expect(result).toBe('default');
    });

    it('returns fallback (or null) if parsing fails', () => {
      localStorage.setItem('badKey', '{badJson');
      expect(LocalStorageService.get('badKey')).toBeNull();
      expect(LocalStorageService.get('badKey', 'default')).toBe('default');
    });
  });

  describe('set', () => {
    it('stores stringified value in localStorage and returns true', () => {
      const success = LocalStorageService.set('testKey', { b: 2 });
      expect(success).toBe(true);
      expect(localStorage.getItem('testKey')).toBe(JSON.stringify({ b: 2 }));
    });

    it('returns false if localStorage setItem throws an error', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        throw new Error('Quota exceeded');
      });
      const success = LocalStorageService.set('testKey', 'value');
      expect(success).toBe(false);
    });
  });

  describe('remove', () => {
    it('removes item from localStorage', () => {
      localStorage.setItem('testKey', 'value');
      LocalStorageService.remove('testKey');
      expect(localStorage.getItem('testKey')).toBeNull();
    });

    it('handles errors gracefully without throwing', () => {
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementationOnce(() => {
        throw new Error('Error');
      });
      expect(() => LocalStorageService.remove('testKey')).not.toThrow();
    });
  });

  describe('clear', () => {
    it('clears all items from localStorage', () => {
      localStorage.setItem('key1', '1');
      localStorage.setItem('key2', '2');
      LocalStorageService.clear();
      expect(localStorage.length).toBe(0);
    });

    it('handles errors gracefully without throwing', () => {
      vi.spyOn(Storage.prototype, 'clear').mockImplementationOnce(() => {
        throw new Error('Error');
      });
      expect(() => LocalStorageService.clear()).not.toThrow();
    });
  });
});
