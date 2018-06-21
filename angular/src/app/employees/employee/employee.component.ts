import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import { NgForm } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
  }
 
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    }
  }
 
  onSubmit(form: NgForm) {
    debugger;
    if (form.value.EmployeeID == null) {
      form.value.EmployeeID = 0;
      this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          //this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        })
    }
    else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.employeeService.getEmployeeList();
       // this.toastr.info('Record Updated Successfully!', 'Employee Register');
      });
    }
  }

}
