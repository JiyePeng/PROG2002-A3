import { Component } from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-index',
  template: `
    <section class="body">
      <div class="sidebar">
        <h3>Non-profit Organisation</h3>
      </div>

      <div class="content">
        <div class="message">
          <button routerLink="/admin/new">Add New</button>
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
              <p>
                <button>Edit</button>
                <button>Delete</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AdminComponent {
  fundraiserList: any[] = [];

  constructor(private appservice: AppService) {
  }

  ngOnInit() {
    this.appservice.getFundraisers().subscribe((r:any) => {
      this.fundraiserList = r
    })
  }
}
