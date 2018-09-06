import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../userservice.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: any;
  reviewslen: any;
  title: any;
  model: any = {};
  model2: any = {};
  model3: any = {};
  model4: any = {};
  model5: any ={};
  user: any;
  loggedin: any;
  admin: any;
  isAdmin: any;
  user_details: any;
  assigned: any;
  assignedlen: any;
  isAssigned: any;
  p: number =1;
  constructor(private service: UserserviceService) {
    this.user = localStorage.getItem('User');
    if(this.user === null) {
      this.loggedin = false;
    } else{
      this.loggedin = true;
      this.admin = localStorage.getItem('admin');
      this.user_details =(JSON.parse(this.user)['data'][0]['email']);
      if(this.admin === null) {
        this.isAdmin = false;
      } else{
        this.isAdmin = true;
        this.user_details =(JSON.parse(this.user)['data'][0]['email']);
      }
    }
  }

  ngOnInit() {
    this.allReviews();
    this.allassignedemployees();
  }
  openPopup(type) {
    if(type=='Assign'){
      this.title = type + ' Employees';
    } else{
      this.title = type + ' Review';
    }
  }
  openPopup2(type, id) {
    this.title = type + ' Review';
    console.log(id);
    if(type=='Update') {
      this.service.allreviews().subscribe(data => {
        console.log(data);
        if (data['success']) {
          this.reviews = data['data'];
          this.reviewslen = this.reviews.length;
          for (var i = 0; i <= this.reviewslen; i++) {
            if (this.reviews[i]['_id'] === id) {
              this.model2.email = this.reviews[i]['email'];
              this.model2.review = this.reviews[i]['review'];
              this.model2.isAdmin = this.reviews[i]['isAdmin'];
              this.model2.status = true;
              if(this.reviews[i]['rating']==null){
                this.model2.rating = 0;
              } else {
                this.model2.rating = this.reviews[i]['rating'];
              }
            }
          }
        } else {
          alert('No data found');
        }
      }, (error) => {
        console.log(error);
        alert('No Internet Connection');
      });
    } else if (type=='View') {
      this.service.allreviews().subscribe(data => {
        if (data['success']) {
          this.reviews = data['data'];
          this.reviewslen = this.reviews.length;
          for (var i = 0; i <= this.reviewslen; i++) {
            if (this.reviews[i]['_id'] === id) {
              this.model2.email = this.reviews[i]['email2'];
              this.model2.review = this.reviews[i]['review'];
              this.model2.isAdmin = this.reviews[i]['isAdmin'];
              this.model2.reviewed_by = this.reviews[i]['reviewed_by'];
              this.model2.status = true;
              if(this.reviews[i]['rating']==null){
                this.model2.rating = 0;
              } else {
                this.model2.rating = this.reviews[i]['rating'];
              }
            }
          }
        } else {
          alert('No data found');
        }
      }, (error) => {
        console.log(error);
        alert('No Internet Connection');
      });
    } else {
      alert('Something Wrong');
    }
  }
  rating(n){
    this.model2.rating = n;
  }
  addReview() {
    console.log(this.model);
    this.model.review='';
    this.model.isAdmin=false;
    this.model.email1 = this.user_details;
    this.model.email2 = this.model.email;
    this.model.status = false;
    this.model.reviewed_by ='';
    this.service.addreviews(this.model).subscribe(data => {
      if(data['success']) {
        alert('Review for ' + this.model['email'] + ' has been added Successfully....');
        window.location.reload();
      } else {
        alert('Already Added');
      }
    }, (error) => {
      console.log(error);
      alert('No Internet Connection');
    });
  }
  editReview() {
    console.log(this.model2);
    this.model2.email1 = this.user_details;
    this.model2.email2 = this.model2.email;
    this.model2.reviewed_by = this.user_details;
    this.service.editreviews(this.model2).subscribe(data => {
      if(data['success']) {
        alert('Review for ' + this.model2.email2 + ' has been updated Successfully....');
        window.location.reload();
      } else {
        alert('Already Updated');
      }
    }, (error) => {
      console.log(error);
      alert('No Internet Connection');
    });
  }
  assignEmployees(){
    this.service.allreviews().subscribe(data => {
      if(data['success']) {
        this.reviews = data['data'];
        this.reviewslen = this.reviews.length;
        for(var i=0;i<=this.reviewslen;i++){
          console.log('check'+ this.reviews[i]['email']);
          console.log('check2'+ this.model4.email1);
          if(this.reviews[i]['email']===this.model4.email1){
            console.log('matched');
            this.model4.email = this.model4.email2;
            this.model4.review = '';
            this.model4.isAdmin = this.reviews[i]['isAdmin'];
            break;
          }
        }
        console.log(this.model4);
        this.service.assingemployees(this.model4).subscribe(data => {
          if(data['success']) {
            alert('Email-1: ' + this.model4['email1'] + '\n and \n Email-2: '+ this.model4['email2']+'\n have been assigned Successfully....');
            window.location.reload();
          } else {
            alert('Already Added');
          }
        }, (error) => {
          console.log(error);
          alert('No Internet Connection');
        });

      } else {
        alert('No data found');
      }
    }, (error) => {
      console.log(error);
      alert('No Internet Connection');
    });
  }

  allReviews() {
    this.service.allreviews().subscribe(data => {
      if(data['success']) {
        this.reviews = data['data'];
        this.reviewslen = this.reviews.length;
      } else {
        alert('No data found');
      }
    }, (error) => {
      console.log(error);
      alert('No Internet Connection');
    });
  }
  allassignedemployees() {
    this.service.allassignedemploys().subscribe(data => {
      if(data['success']) {
        this.assigned = data['data'];
        this.assignedlen = this.assigned.length;
      } else {
        alert('No data found');
      }
    }, (error) => {
      console.log(error);
      alert('No Internet Connection');
    });
  }


}
