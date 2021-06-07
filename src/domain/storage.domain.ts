export const clearStorage = () => {
  localStorage.clear();
};

export const getStorageValue = <T>(key: string) => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : undefined;
};

export const setStorageValue = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorageValue = (key: string) => {
  localStorage.removeItem(key);
};
