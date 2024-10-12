import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
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
        <form id="fundraiser-form">
          <div class="form-group">
            <label for="organizer">Organizer:</label>
            <input type="text" id="organizer">
          </div>

          <div class="form-group">
            <label for="city">City:</label>
            <input type="text" id="city">
          </div>

          <div class="form-group">
            <label for="category">Category:</label>
            <select id="category">
              <option value="">All Category</option>
            </select>
          </div>

          <button type="submit">Search</button>
          <button type="reset">Clear</button>
        </form>
      </div>
      <div id="fundraisers"></div>
    </div>
  `,
})
export class SearchComponent {
}
