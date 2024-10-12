import { Component } from '@angular/core';
import { AppService } from "./app.service";

@Component({
  selector: 'app-search',
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
          <form id="fundraiser-form" (ngSubmit)="search()">
            <div class="form-group">
              <label for="organizer">Organizer:</label>
              <input type="text" id="organizer" name="organizer" [(ngModel)]="organizer">
            </div>
  
            <div class="form-group">
              <label for="city">City:</label>
              <input type="text" id="city" name="city" [(ngModel)]="city">
            </div>
  
            <div class="form-group">
              <label for="category">Category:</label>
              <select id="category" name="category" [(ngModel)]="category">
                <option value="">All Category</option>
                <option *ngFor="let category of categoryList" [value]="category.CATEGORY_ID">{{category.NAME}}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="active">Active:</label>
              <select id="active" name="active" [(ngModel)]="active">
                <option value="">All Status</option>
                <option [value]="0">InActive</option>
                <option [value]="1">Active</option>
              </select>
            </div>
  
            <button type="submit">Search</button>
            <button type="reset">Clear</button>
          </form>
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
          </div>
          <div class="empty" *ngIf="fundraiserList.length===0">No fundraisers are found</div>
        </div>
      </div>
    </section>
  `,
})
export class SearchComponent {

  organizer = ""
  city = ""
  category = ""
  active = ""

  fundraiserList: any[] = [];
  categoryList: any[] = [];

  constructor(private appservice: AppService) {
  }

  ngOnInit() {
    this.appservice.getCategories().subscribe((r:any) => {
      this.categoryList = r
    })
  }

  search() {
    if (!this.organizer && !this.city && !this.category && this.active === "") {
      alert("You should enter at least one search term");
    } else {
      this.appservice.getFundraisers(this.organizer, this.city, Number(this.category), this.active)
        .subscribe((r:any) => {
          this.fundraiserList = r
        })
    }
  }

}
