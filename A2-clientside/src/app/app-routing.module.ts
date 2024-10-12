import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index.component";
import {SearchComponent} from "./search.component";
import {DetailsComponent} from "./details.component";
import {DonationComponent} from "./donation.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'search', component: SearchComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'donation/:id', component: DonationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
