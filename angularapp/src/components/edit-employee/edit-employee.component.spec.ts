import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { EditEmployeeComponent } from './edit-employee.component';
import { EmployeeService } from 'src/service/employee.service';
import { Employee } from 'src/model/employee.model';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockEmployee: Employee = {
    id: "05e833b8-cd86-472e-a440-08db999a7231",
    name: 'John Doe',
    position: 'Developer',
    hiringDate: new Date('2022-01-01'),
    salary: 50000,
  };

  beforeEach(() => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['getEmployeeById', 'updateEmployee']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

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
      declarations: [EditEmployeeComponent],
      providers: [
        DatePipe,
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: "05e833b8-cd86-472e-a440-08db999a7231" } } } },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: EmployeeService, useValue: mockEmployeeService },
      ],
    });

    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    mockEmployeeService.getEmployeeById.and.returnValue(of(mockEmployee));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and fetch employee details on ngOnInit', () => {
    expect(component.editForm.value).toEqual(mockEmployee);
  });

  it('should save updated employee and navigate on successful save', () => {
    mockEmployeeService.updateEmployee.and.returnValue(of());
    component.employee = mockEmployee;
    component.editForm.patchValue({ name: 'Updated Name' });

    component.saveEmployee();
    fixture.detectChanges();
    expect(mockEmployeeService.updateEmployee).toHaveBeenCalledWith({
      ...mockEmployee,
      name: 'Updated Name',
    });
  });
  it('should show error message on negative salary', () => {
    component.editForm.setValue({ ...mockEmployee, salary: -100 });

    component.saveEmployee();

    expect(mockToastrService.error).toHaveBeenCalledWith('Save failed because salary is negative number!', 'Error');
    expect(mockRouter.navigate).not.toHaveBeenCalled(); // Should not navigate
  });

  it('should handle error fetching employee details', () => {
    mockEmployeeService.getEmployeeById.and.returnValue(throwError('Some error'));

    component.ngOnInit();

    expect(mockToastrService.error).toHaveBeenCalledWith('Invalid employee info', 'Error');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employees']);
  });
});

