import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IndexComponent} from "./index.component";
import {SearchComponent} from "./search.component";
import {DetailsComponent} from "./details.component";
import { HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DonationComponent} from "./donation.component";
import {AdminComponent} from "./admin.component";
import {AdminFundraiserComponent} from "./admin-fundraiser.component";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SearchComponent,
    DetailsComponent,
    DonationComponent,
    AdminComponent,
    AdminFundraiserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
