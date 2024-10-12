import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "./app.service";

@Component({
  selector: 'app-donation',
  template: `
    <section class="body">
      <div class="sidebar">
        <h3>Non-profit Organisation</h3>
        <ul>
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/search">Search</a></li>
        </ul>
      </div>

      <div class="content">
        <div class="message">
          <h1>Fundraiser Detail</h1>
        </div>
        <div id="fundraisers">
          <div class="fundraiser-item" *ngFor="let fundraiser of fundraiserList">
            <div class="fundraiser-header">
              <img src="../assets/images/logo{{fundraiser.FUNDRAISER_ID % 5 + 1}}.png" alt="Logo" class="fundraiser-logo">
              <h3>{{fundraiser.ORGANIZER}}</h3>
              <div class="fundraiser-status">
                ({{fundraiser.ACTIVE ? 'Active' : 'Suspended'}})
              </div>
            </div>
            <div class="fundraiser-details">
              <p><strong>ID:</strong> {{fundraiser.FUNDRAISER_ID}}</p>
              <p><strong>Caption:</strong> {{fundraiser.CAPTION}}</p>
              <p><strong>Target Funding:</strong> {{fundraiser.TARGET_FUNDING.toLocaleString()}} AUD</p>
              <p><strong>Current Funding:</strong> {{fundraiser.CURRENT_FUNDING.toLocaleString()}} AUD</p>
              <p><strong>Location:</strong> {{fundraiser.CITY}}</p>
              <p><strong>Category Name:</strong> {{fundraiser.NAME}}</p>
            </div>
          </div>
        </div>
        <div class="message">
          <h2>Donation</h2>
          <form id="fundraiser-form" (ngSubmit)="submitMyDonation()">
            <div class="form-group">
              <label for="giver">giver:</label>
              <input type="text" id="giver" name="giver" [(ngModel)]="giver">
            </div>

            <div class="form-group">
              <label for="amount">amount:</label>
              <input type="text" id="amount" name="amount" [(ngModel)]="amount">
            </div>

            <button type="submit">Submit my donation</button>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class DonationComponent {
  fundraiserList: any[] = [];

  giver = ""
  amount = ""

  constructor(private route:ActivatedRoute,private appservice: AppService) {
    this.route.paramMap.subscribe((p:any) => {
      let id = Number(p.params.id)
      this.appservice.getFundraiserByID(id).subscribe((r:any) => {
        this.fundraiserList = r;
      })
    })
  }

  submitMyDonation() {
    if (!this.giver) {
      alert("Giver should be input.")
      return
    }

    if (!/^\b([5-9]|\d{2,})\b$/.test(this.amount)) {
      alert("Amount should be correct(minimum 5 AUD).")
      return
    }

    this.appservice.postDonations({ giver:this.giver,amount:this.amount,fundraiserid:this.fundraiserList[0].FUNDRAISER_ID })
      .subscribe(r => {
        alert(`Thank you for your donation to ${this.fundraiserList[0].CAPTION}`);
        this.giver=""
        this.amount=""
      })
  }
}
