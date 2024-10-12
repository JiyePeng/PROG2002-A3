import { Component } from '@angular/core';
import {AppService} from "./app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-index',
  template: `
    <section class="body">
      <div class="sidebar">
        <h3>Non-profit Organisation</h3>
      </div>

      <div class="content">
        <div class="message">
          <h2>Add/Edit Fundraiser</h2>
          <form id="fundraiser-form" style="flex-direction: column;align-items: flex-start;gap:0" (ngSubmit)="submitFundraiser()">
            <div class="form-group">
              <label for="organizer">organizer:</label>
              <input type="text" id="organizer" name="organizer" [(ngModel)]="fundraiser.organizer">
            </div>

            <div class="form-group">
              <label for="caption">caption:</label>
              <input type="text" id="caption" name="caption" [(ngModel)]="fundraiser.caption">
            </div>

            <div class="form-group">
              <label for="target_funding">target funding:</label>
              <input type="text" id="target_funding" name="target_funding" [(ngModel)]="fundraiser.target_funding">
            </div>

            <div class="form-group">
              <label for="current_funding">current funding:</label>
              <input type="text" id="current_funding" name="current_funding" [(ngModel)]="fundraiser.current_funding">
            </div>

            <div class="form-group">
              <label for="city">city:</label>
              <input type="text" id="city" name="city" [(ngModel)]="fundraiser.city">
            </div>

            <div class="form-group">
              <label for="active">active:</label>
              <select id="active" name="active" [(ngModel)]="fundraiser.active">
                <option value="1">Active</option>
                <option value="0">Suspended</option>
              </select>
            </div>

            <div class="form-group">
              <label for="category">Category:</label>
              <select id="category" name="category" [(ngModel)]="fundraiser.category_id">
                <option value="">All Category</option>
                <option *ngFor="let category of categoryList" [value]="category.CATEGORY_ID">{{category.NAME}}</option>
              </select>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class AdminFundraiserComponent {
  categoryList: any[] = [];

  fundraiser = {
    id: "",
    organizer: "",
    caption: "",
    target_funding: "",
    current_funding: "",
    city: "",
    active: "1",
    category_id: "",
  }

  constructor(private appservice: AppService,private router:Router,private route: ActivatedRoute) {
    this.route.paramMap.subscribe((p:any) => {
      let id = Number(p.params.id)
      this.appservice.getFundraiserByID(id).subscribe((r:any) => {
        this.fundraiser.id = r[0].FUNDRAISER_ID;
        this.fundraiser.organizer = r[0].ORGANIZER;
        this.fundraiser.caption = r[0].CAPTION;
        this.fundraiser.target_funding = "" + parseInt(r[0].TARGET_FUNDING);
        this.fundraiser.current_funding = "" + parseInt(r[0].CURRENT_FUNDING);
        this.fundraiser.city = r[0].CITY;
        this.fundraiser.active = r[0].ACTIVE;
        this.fundraiser.category_id = r[0].CATEGORY_ID;
      })
    })
  }

  ngOnInit() {
    this.appservice.getCategories().subscribe((r:any) => {
      this.categoryList = r
    })
  }

  submitFundraiser() {
    if (!this.fundraiser.organizer||!this.fundraiser.caption||!this.fundraiser.target_funding
      ||!this.fundraiser.current_funding||!this.fundraiser.city||!this.fundraiser.active
      ||!this.fundraiser.category_id) {
      alert("You must input all fields!")
    } else if (!/^\b([5-9]|\d{2,})\b$/.test(this.fundraiser.target_funding) || !/^\b([5-9]|\d{2,})\b$/.test(this.fundraiser.current_funding)) {
      alert("Funding must be number(minimum 5 AUD)!")
    } else {
      if (!this.fundraiser.id) {
        this.appservice.postFundraiser(this.fundraiser).subscribe(r => {
          alert("Create!");
          this.router.navigateByUrl('/admin')
        })
      } else {
        this.appservice.putFundraiser(this.fundraiser).subscribe(r => {
          alert("Edit!");
          this.router.navigateByUrl('/admin')
        })
      }

    }
  }
}
