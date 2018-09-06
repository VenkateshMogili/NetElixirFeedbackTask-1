import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  loggedin: any;
  admin: any;
  isAdmin: any;
  name: any;
  reviews: any;
  dashboard: any;
  employees: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.user = localStorage.getItem('User');
    if(this.user === null) {
      this.loggedin = false;
    } else{
      this.loggedin = true;
      this.name =(JSON.parse(this.user)['data'][0]['username']);
      this.admin = localStorage.getItem('admin');
      if(this.admin === null) {
        this.isAdmin = false;
      } else{
        this.isAdmin = true;
      }
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reviews = params['reviews'];
      this.dashboard = params['dashboard'];
      this.employees = params['employees'];
    });
  }
  logout(){
    localStorage.removeItem('User');
    if(localStorage.getItem('admin')){
      localStorage.removeItem('admin');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
