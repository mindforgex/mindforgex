import { useEffect, useState } from "react";

export function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(fallbackValue);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
    setReady(true);
  }, [JSON.stringify(fallbackValue), key]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, ready]);

  return [value, setValue, ready];
}
