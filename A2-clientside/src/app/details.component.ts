import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  template: `
    <div class="sidebar">
      <h3>Non-profit Organisation</h3>
      <ul>
        <li><a href="./index.html">Home</a></li>
        <li><a href="./search.html">Search</a></li>
        <li><a href="./details.html">Details</a></li>
      </ul>
    </div>

    <div class="content">
      <div class="message">
        <h1>Fundraiser Detail</h1>
      </div>
      <div id="fundraisers"></div>
      <script src="./javascripts/details.js"></script>
    </div>
  `,
})
export class DetailsComponent {
}
