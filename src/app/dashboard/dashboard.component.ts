import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../userservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reviews: any;
  reviewslen: any;
  employees: any;
  employeeslen: any;
  admin: any;
  isAdmin: any;
  constructor(private service: UserserviceService) {
    if(localStorage.getItem('admin') === null) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }

  ngOnInit() {
    this.allReviews();
    this.allEmployees();
  }
  allReviews() {
    this.service.allreviews().subscribe(data => {
      if(data['success']) {
        this.reviews = data['data'];
        this.reviewslen = this.reviews.length;
      } else {
        alert('No data found');
      }
    }, (error)=>{
      console.log(error);
      alert("No Internet Connection");
    });
  }
  allEmployees() {
    this.service.allemployees().subscribe(data => {
      if(data['success']) {
        this.employees = data['data'];
        this.employeeslen = this.employees.length;
      } else {
        alert('No data found');
      }
    }, (error)=>{
      console.log(error);
      alert("No Internet Connection");
    });
  }

}
