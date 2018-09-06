import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {EmployeesComponent} from './employees/employees.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'employees', component: EmployeesComponent}
];

export const CONST_ROUTING = RouterModule.forRoot(routes);
