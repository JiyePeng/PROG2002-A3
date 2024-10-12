import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AppService {
  serverUrl = "http://localhost:3000"

  constructor(private http: HttpClient) {
  }

  getCategories(): any {
    return this.http.get(`${this.serverUrl}/categories`)
  }

  getFundraisers(ORGANIZER?: string, CITY?: string, CATEGORY_ID?: number, ACTIVE?: number|string): any {
    return this.http.get(`${this.serverUrl}/fundraisers?ORGANIZER=${ORGANIZER||""}&CITY=${CITY||""}&CATEGORY_ID=${CATEGORY_ID||""}&ACTIVE=${ACTIVE === "" ? "" : ACTIVE}`)
  }

  getFundraiserByID(id: number) {
    return this.http.get(`${this.serverUrl}/fundraisers/${id}`)
  }

  postFundraiser(fundraiser: any) {
    return this.http.post(`${this.serverUrl}/fundraisers`, fundraiser)
  }

  putFundraiser(fundraiser: any) {
    return this.http.put(`${this.serverUrl}/fundraisers/${fundraiser.id}`, fundraiser)
  }

  delFundraiser(id: number) {
    return this.http.delete(`${this.serverUrl}/fundraisers/${id}`)
  }

  getDonations(id: number) {
    return this.http.get(`${this.serverUrl}/donations/${id}`)
  }

  postDonations(donation: any) {
    return this.http.post(`${this.serverUrl}/donations`, donation)
  }
}
