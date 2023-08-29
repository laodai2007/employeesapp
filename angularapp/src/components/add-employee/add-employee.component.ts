import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/model/employee.model';
import { EmployeeService } from 'src/service/employee.service';
import * as moment from 'moment';
import { globalCacheBusterNotifier } from 'ts-cacheable';

@Component({
    selector: 'app-employee-add',
    templateUrl: 'add-employee.component.html',
})
export class AddEmployeeComponent implements OnInit {
    addForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        position: [''],
        hiringDate: [new Date()],
        salary: ['', [Validators.min(0), Validators.pattern(/^\d+$/)]]
    });

    employee!: Employee;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private toastr: ToastrService,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.addForm = this.fb.group({
            name: [''],
            position: [''],
            hiringDate: [new Date()],
            salary: ['']
        });
    }

    back() {
        this.router.navigate(['/employees']);
    }
    
    saveEmployee() {
        const newEmployee: Employee = {
            ...this.employee,
            ...this.addForm.value
        };
        if (newEmployee.salary >= 0){
            newEmployee.hiringDate = new Date(moment(newEmployee.hiringDate).format('YYYY-MM-DD'));
            this.employeeService.addEmployee(newEmployee).subscribe(
                () => {
                    globalCacheBusterNotifier.next();
                    this.toastr.success('Employee saved successfully!');
                    this.router.navigate(['/employees']);
                },
                (error) => {
                    console.error('Error adding employee:', error);
                    this.toastr.error('Save failed because salary is negative number!', 'Error');
                }
            );
        } else {
            this.toastr.error('Save failed because salary is negative number!', 'Error');
        }
        
    }
}
