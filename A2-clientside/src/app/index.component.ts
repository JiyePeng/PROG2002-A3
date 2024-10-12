import { Component } from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-index',
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
          <h1>Welcome to our non-profit organisation</h1>
          <p>Daniel, a 10-year-old boy from a low-income neighborhood, always had a passion for learning. But his family's financial struggles meant that school supplies and even regular attendance were luxuries they couldn’t afford. His mother worked two jobs just to provide food, leaving no money for books or uniforms.</p>
          <p>Then Hope for Change stepped in with our education sponsorship program. We provided Daniel with everything he needed—school fees, uniforms, and supplies. More importantly, We gave him hope. Today, Daniel is excelling in his studies and has dreams of becoming an engineer, a possibility that once seemed unreachable.</p>
          <p>Address: Liushi Subdistrict is a subdistrict in Liunan District, Liuzhou, Guangxi, China.</p>
          <p>Phone: 19922749472</p>
          <p>Email: 1486470850&#64;qq.com</p>
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
        </div>
      </div>
    </section>
  `,
})
export class IndexComponent {
  fundraiserList: any[] = [];

  constructor(private appservice: AppService) {
  }

  ngOnInit() {
    this.appservice.getFundraisers().subscribe((r:any) => {
      this.fundraiserList = r
    })
  }
}
