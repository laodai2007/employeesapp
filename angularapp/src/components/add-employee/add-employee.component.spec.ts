import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddEmployeeComponent } from './add-employee.component';
import { EmployeeService } from 'src/service/employee.service';
import { of, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Employee } from 'src/model/employee.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddEmployeeComponent', () => {
    let component: AddEmployeeComponent;
    let fixture: ComponentFixture<AddEmployeeComponent>;
    let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockToastr: jasmine.SpyObj<ToastrService>;
    let mockDatePipe: jasmine.SpyObj<DatePipe>;

    beforeEach(() => {
        mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['addEmployee']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockToastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);
        mockDatePipe = jasmine.createSpyObj('DatePipe', ['transform']);

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatDatepickerModule,
                MatNativeDateModule,
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],
            declarations: [AddEmployeeComponent],
            providers: [
                { provide: ActivatedRoute, useValue: {} },
                { provide: EmployeeService, useValue: mockEmployeeService },
                { provide: Router, useValue: mockRouter },
                { provide: ToastrService, useValue: mockToastr },
                { provide: DatePipe, useValue: mockDatePipe }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddEmployeeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should save employee', () => {
        // Arrange
        mockEmployeeService.addEmployee.and.returnValue(of());

        // Act
        component.saveEmployee();

        // Assert
        expect(mockEmployeeService.addEmployee).toHaveBeenCalled();
    });

    it('should handle save error', () => {
        // Arrange
        mockEmployeeService.addEmployee.and.returnValue(throwError('Some error'));

        // Act
        component.saveEmployee();

        // Assert
        expect(mockEmployeeService.addEmployee).toHaveBeenCalled();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
        expect(mockToastr.error).toHaveBeenCalledWith(
            'Save failed because salary is negative number!',
            'Error'
        );
    });
});
