import { useCallback, useState } from 'react';

const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const storageAvailable = isLocalStorageAvailable();

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!storageAvailable) return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        if (['{', '['].includes(item[0])) return JSON.parse(item);
        if (item === 'true' || item === 'false') return item === 'true';
        return item as unknown as T;
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
    return initialValue;
  });
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
  
        if (storageAvailable) {
          const serialized =
            typeof valueToStore === 'object'
              ? JSON.stringify(valueToStore)
              : String(valueToStore);
          window.localStorage.setItem(key, serialized);
        }
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    },
    [key, storedValue, storageAvailable]
  );

  const removeValue = useCallback(() => {
    try {
      if (storageAvailable) window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage:", error);
    }
  }, [key, storageAvailable]);

  return [storedValue, setValue, removeValue] as const;
};

export default useLocalStorage;
