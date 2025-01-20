import { LocalStorageKey } from "../models/local-storage-key.model";

export class LocalStorage {

  constructor() { }

  static get(key: LocalStorageKey) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static set(key: LocalStorageKey, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static delete(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}


