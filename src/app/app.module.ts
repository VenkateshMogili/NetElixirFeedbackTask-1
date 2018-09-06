import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {CONST_ROUTING} from './app.routing';
import {UserserviceService} from "./userservice.service";
import {HttpModule} from '@angular/http';
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReviewsComponent } from './reviews/reviews.component';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    EmployeesComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CONST_ROUTING,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
