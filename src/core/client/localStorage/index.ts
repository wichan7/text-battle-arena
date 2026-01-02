type AccessToken = string;

type LocalStorage = {
  accessToken?: AccessToken;
  hgee?: string;
};

const get = <K extends keyof LocalStorage>(key: K): LocalStorage[K] | null => {
  const value = window.localStorage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as LocalStorage[K];
  } catch {
    return null;
  }
};

const set = <K extends keyof LocalStorage>(
  key: K,
  value: LocalStorage[K],
): void => {
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  window.localStorage.setItem(key, stringValue);
};

const clear = (): void => {
  window.localStorage.clear();
};

const remove = (key: keyof LocalStorage): void => {
  window.localStorage.removeItem(key);
};

const localStorage = { get, set, clear, remove };
export default localStorage;
