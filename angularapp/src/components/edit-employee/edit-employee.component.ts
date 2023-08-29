import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/model/employee.model';
import { EmployeeService } from 'src/service/employee.service';
import * as moment from 'moment';
import { globalCacheBusterNotifier } from 'ts-cacheable';

@Component({
    selector: 'app-employee-edit',
    templateUrl: 'edit-employee.component.html',
})
export class EditEmployeeComponent implements OnInit {
    editForm: FormGroup = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        position: [''],
        hiringDate: [''],
        salary: ['', [Validators.min(0), Validators.pattern(/^\d+$/)]]
    });

    employee!: Employee;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.initForm();

        const employeeId = this.route.snapshot.params['id'];
        this.employeeService.getEmployeeById(employeeId).subscribe(
            (employee: any) => {
                this.employee = employee;
                this.editForm.patchValue(employee); // Fill form with employee data
            },
            (error: any) => {
                console.error('Error fetching employee details:', error);
                this.toastr.error('Invalid employee info', 'Error');
                this.router.navigate(['/employees']);
            }
        );
    }

    initForm() {
        this.editForm = this.fb.group({
            id: [''],
            name: [''],
            position: [''],
            hiringDate: [''],
            salary: ['']
        });
    }
    onChangeDate(e: any) {
        console.log(moment(e.value).format('YYYY-MM-DD'))
    }

    back() {
        this.router.navigate(['/employees']);
    }

    saveEmployee() {
        const updatedEmployee: Employee = {
            ...this.employee,
            ...this.editForm.value
        };
        if (updatedEmployee.salary >= 0){
            updatedEmployee.hiringDate = new Date(moment(updatedEmployee.hiringDate).format('YYYY-MM-DD'));
            this.employeeService.updateEmployee(updatedEmployee).subscribe(
                () => {
                    globalCacheBusterNotifier.next();
                    this.toastr.success('Employee saved successfully!');
                    this.router.navigate(['/employees']);
                },
                (error) => {
                    console.error('Error updating employee:', error);
                    this.toastr.error('Save failed because salary is negative number!', 'Error');
                }
            );
        } else {
            this.toastr.error('Save failed because salary is negative number!', 'Error');
        }
        
    }
}
