import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
class AppService {
  serverUrl = "http://localhost:3000"

  constructor(private http: HttpClient) {
  }

  getCategories(): any {
    this.http.get(`${this.serverUrl}/categories`)
  }

  getFundraisers(ORGANIZER: string, CITY: string, CATEGORY_ID: number, ACTIVE: boolean): any {
    this.http.get(`${this.serverUrl}/fundraisers?ORGANIZER=${ORGANIZER}&CITY=${CITY}&CATEGORY_ID=${CATEGORY_ID}&ACTIVE=${ACTIVE}`)
  }

  getFundraiserByID(id: number) {
    this.http.get(`${this.serverUrl}/fundraisers?id=${id}`)
  }

  postFundraiser(fundraiser: any) {
    this.http.post(`${this.serverUrl}/fundraisers`, fundraiser)
  }

  putFundraiser(fundraiser: any) {
    this.http.put(`${this.serverUrl}/fundraisers/${fundraiser.id}`, fundraiser)
  }

  delFundraiser(id: number) {
    this.http.delete(`${this.serverUrl}/fundraisers/${id}`)
  }

  getDonations(id: number) {
    this.http.get(`${this.serverUrl}/donations?fundraiserid=${id}`)
  }

  postDonations(donation: any) {
    this.http.post(`${this.serverUrl}/donations`, donation)
  }
}
