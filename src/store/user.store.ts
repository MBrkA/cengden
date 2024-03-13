import { defineStore } from "pinia";

interface State {
  user: any | null;
}

interface Actions {
  setUser(user: any): void;
}

export const useUserStore = defineStore<string, State, any, Actions>(
  "user",
  {
    state: () => ({
      user: null,
    }),
    actions: {
      setUser(user: any) {
        this.user = user;
      }
    },
  }
);
