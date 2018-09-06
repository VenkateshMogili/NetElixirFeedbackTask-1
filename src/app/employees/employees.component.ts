import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../userservice.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any;
  employeeslen: any;
  isAdmin: any;
  model: any ={};
  title: any;
  username: any;
  email: any;
  password: any;
  model2: any = {};
  model3: any = {};
  p: number = 1;
  constructor(private service: UserserviceService) {
    if(localStorage.getItem('admin')) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  ngOnInit() {
    this.allEmployees();
  }
  allEmployees() {
    this.service.allemployees().subscribe(data => {
      if(data['success']) {
        this.employees = data['data'];
        this.employeeslen = this.employees.length;
      } else {
        alert('No data found');
      }
    }, (error) => {
      console.log(error);
      alert('No Internet Connection');
    });
  }
  openPopup(type) {
    this.title = type + ' Employee';
  }
  openPopup2(type, id) {
    this.title = type + ' Employee';
    if(type=='Update') {
      this.service.allemployees().subscribe(data => {
        if (data['success']) {
          this.employees = data['data'];
          this.employeeslen = this.employees.length;
          for (var i = 0; i <= this.employeeslen; i++) {
            if (this.employees[i]['_id'] === id) {
              this.model2.username = this.employees[i]['username'];
              this.model2.email = this.employees[i]['email'];
              this.model2.password = this.employees[i]['password'];
              this.model2.isAdmin = this.employees[i]['isAdmin'];
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
        this.service.allemployees().subscribe(data => {
          if (data['success']) {
            this.employees = data['data'];
            this.employeeslen = this.employees.length;
            for (var i = 0; i <= this.employeeslen; i++) {
              if (this.employees[i]['_id'] === id) {
                this.model3.username = this.employees[i]['username'];
                this.model3.email = this.employees[i]['email'];
                this.model3.password = this.employees[i]['password'];
                this.model3.isAdmin = this.employees[i]['isAdmin'];
              }
            }
          } else {
            alert('No data found');
          }
        }, (error) => {
          console.log(error);
          alert('No Internet Connection');
        });
    } else if (type === 'Delete'){
      const confirms = confirm('Are you sure want to delete?');
      if(confirms) {
        this.delete(id);
      }
    }
  }
  addEmployee() {
    console.log(this.model);
    this.service.addemployees(this.model).subscribe(data => {
      if(data['success']) {
        alert('Employee ' + this.model['username'] + ' Added Successfully....');
        window.location.reload();
      } else {
        alert('Already Added');
      }
    }, (error) => {
      console.log(error);
      alert('No Internet Connection');
    });
  }
  editEmployee() {
    console.log(this.model2);
    this.service.editemployees(this.model2).subscribe(data => {
      if(data['success']) {
        alert('Employee ' + this.model2['username'] + ' Updated Successfully....');
        window.location.reload();
      } else {
        alert('Already Updated');
      }
    }, (error) => {
      console.log(error);
      alert('No Internet Connection');
    });
  }
  delete(id){
    if(localStorage.getItem('admin')) {
      this.service.deleteemployee(id).subscribe(data => {
        if (data['success']) {
          alert('Deleted Successfully...');
          window.location.reload();
        } else {
          alert('Error');
        }
      });
    } else{
      alert('You are not admin');
    }
  }

}
