import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../userservice.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  user: any;
  constructor(private service: UserserviceService, private router: Router) {
    this.user = localStorage.getItem('User');
    if (this.user == null) {
      //do nothing
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
  }
  validateLogin() {
      console.log(this.model);
      this.service.login(this.model).subscribe(
        data => {
          console.log(data);
          if (data['success']) {
            localStorage.setItem('User', JSON.stringify(data));
            if (data['data'][0]['isAdmin'] === true ) {
              const admin = {'isAdmin': true};
              localStorage.setItem('admin', JSON.stringify(admin));
            }
            this.router.navigate(['/dashboard']);
          } else {
            alert('Wrong username and password');
          }
        }, (error) => {
          console.log(error);
          alert('Please check internet connection');
        });
  }
  updateEmployee() {
    console.log(this.model);
    this.service.update(this.model).subscribe(
      data => {
        console.log(data);
        if (data['success']) {
          alert('Logged in successfully...');
          localStorage.setItem('User', JSON.stringify(data));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Wrong username and password');
        }
      });
  }

}
