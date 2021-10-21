import create, { StateCreator, UseStore } from "zustand";
import { persist } from "zustand/middleware";

// Core storage abstractions
abstract class Store<T extends object> {
  store: UseStore<T>;

  constructor(store: UseStore<T>) {
    this.store = store;
  }
}

// Persistent data storage
export class LocalStorage<T extends object> extends Store<T> {
  store: UseStore<T>;

  constructor(name: string, state: StateCreator<T>) {
    const local = persist<T>(state, { name, getStorage: () => localStorage });
    const store = create<T>(local);

    super(store);
  }
}

// Ephemeral data storage (not yet used)
class MemoryStorage<T extends object> extends Store<T> {
  store: UseStore<T>;

  constructor(state: StateCreator<T>) {
    const store = create<T>(state);

    super(store);
  }
}

// Session data storage (not yet used)
class SessionStorage<T extends object> extends Store<T> {
  store: UseStore<T>;

  constructor(name: string, state: StateCreator<T>) {
    const local = persist<T>(state, { name, getStorage: () => sessionStorage });
    const store = create<T>(local);

    super(store);
  }
}