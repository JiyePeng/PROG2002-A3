import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "./app.service";

@Component({
  selector: 'app-details',
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
          <div class="fundraiser-item" *ngFor="let fundraiser of fundraiserList" [routerLink]="'/details/' + fundraiser.FUNDRAISER_ID">
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
            <button (click)="donate()">Donate</button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class DetailsComponent {
  fundraiserList: any[] = [];

  constructor(private route:ActivatedRoute,private appservice: AppService) {
    this.route.paramMap.subscribe((p:any) => {
      let id = Number(p.params.id)
      this.appservice.getFundraiserByID(id).subscribe((r:any) => {
        this.fundraiserList = r;
      })
    })
  }

  donate() {}
}
