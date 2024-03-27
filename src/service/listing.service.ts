import { useHttp } from "./http.service";
import { reactive } from "vue";

class ListingService {
  constructor(private readonly http = useHttp()) {}

    async getListingById(id: string) {
        const result = await this.http.get(`/listing/${id}`, );
        return result.data;
    }

  async getAllListings() {
    const result = await this.http.get("/listing", );
    return result.data;
  }

  async getListingsByArray(array: string[]) {
    const result = await this.http.post("/listing/multiple", array);
    return result.data;
  }

  async getListingsByFilter(filter: any) {
    const result = await this.http.post("/listing/filter", filter);
    return result.data;
  }

  async createListing(data: any) {
    const result = await this.http.post("/listing", data);
    return result.data;
  }

  async updateListing(id: string, data: any) {
    const result = await this.http.put(`/listing/${id}`, data);
    return result.data;
  }

  async activateListing(id: string) {
    const result = await this.http.put(`/listing/${id}/activate`, {});
    return result.data;
  }

    async deactivateListing(id: string) {
        const result = await this.http.put(`/listing/${id}/deactivate`, {});
        return result.data;
    }

    async deleteListing(id: string) {
        const result = await this.http.delete(`/listing/${id}`);
        return result.data;
    }

}

let GLOBAL_LISTING_SERVICE: ListingService | null = null;

function useListingService() {
  if (GLOBAL_LISTING_SERVICE === null) {
    GLOBAL_LISTING_SERVICE = new ListingService();
  }
  return reactive<ListingService>(GLOBAL_LISTING_SERVICE);
}

export { useListingService };
