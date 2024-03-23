import { useHttp } from "./http.service";
import { reactive } from "vue";

class UserService {
  constructor(private readonly http = useHttp()) {}

  async getAllUsers() {
    const result = await this.http.get("/user", );
    return result.data;
  }

  async getUserById(id: string) {
    const result = await this.http.get(`/user/${id}`, );
    return result.data;
  }

    async createUser(data: any) {
        const result = await this.http.post("/user", data);
        return result.data;
    }

    async updateUser(id: string, data: any) {
        console.log(id, data)
        const result = await this.http.put(`/user/${id}`, data);
        return result.data;
    }

    async deleteUser(id: string) {
        const result = await this.http.delete(`/user/${id}`);
        return result.data;
    }

    async login(email: string, password: string) {
        const result = await this.http.post("/user/login", { email, password });
        return result.data;
    }

    async addToFavorites(userId: string, listingId: string) {
        const result = await this.http.put(`/user/${userId}/favorites/${listingId}`);
        return result.data;
    }

    async removeFromFavorites(userId: string, listingId: string) {
        const result = await this.http.delete(`/user/${userId}/favorites/${listingId}`);
        return result.data;
    }

    async addToListings(userId: string, listingId: string) {
        const result = await this.http.put(`/user/${userId}/listings/${listingId}`);
        return result.data;
    }

    async removeFromListings(userId: string, listingId: string) {
        const result = await this.http.delete(`/user/${userId}/listings/${listingId}`);
        return result.data;
    }
}

let GLOBAL_USER_SERVICE: UserService | null = null;

function useUserService() {
  if (GLOBAL_USER_SERVICE === null) {
    GLOBAL_USER_SERVICE = new UserService();
  }
  return reactive<UserService>(GLOBAL_USER_SERVICE);
}

export { useUserService };
