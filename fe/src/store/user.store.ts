import { defineStore } from "pinia";

interface State {
  user: any | null;
}

interface Actions {
  setUser(user: any): void;
  logout(): void;
  addToFavorites(listingId: string): void;
  removeFromFavorites(listingId: string): void;
}

export const useUserStore = defineStore<string, State, any, Actions>(
  "user",
  {
    state: () => ({
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
    }),
    actions: {
      setUser(user: any) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      },
        logout() {
            this.user = null;
            localStorage.removeItem("user");
        },
        addToFavorites(listingId: string) {
            if (this.user) {
            this.user.favorites.push(listingId);
            localStorage.setItem("user", JSON.stringify(this.user));
            }
        },
        removeFromFavorites(listingId: string) {
            if (this.user) {
                this.user.favorites = this.user.favorites.filter((id: string) => id !== listingId);
                localStorage.setItem("user", JSON.stringify(this.user));
            }
        }
    },
  }
);
