// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ListEmployeeComponent } from './list-employee.component';
// import { EmployeeService } from 'src/service/employee.service';
// import { of } from 'rxjs';
// import { Router } from '@angular/router';
// import { AgGridModule } from 'ag-grid-angular';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('ListEmployeeComponent', () => {
//   let component: ListEmployeeComponent;
//   let fixture: ComponentFixture<ListEmployeeComponent>;
//   let employeeService: jasmine.SpyObj<EmployeeService>;
//   let router: Router;

//   const mockEmployees = [
//     { id: "05e833b8-cd86-472e-a440-08db999a7231", name: 'John', position: 'Developer', hiringDate: new Date('2023-01-01'), salary: 50000 },
//     { id: "05e833b8-cd86-472e-a440-08db999a7232", name: 'Jane', position: 'Designer', hiringDate: new Date('2023-02-01'), salary: 60000 }
//   ];

//   beforeEach(() => {
//     const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees']);
//     TestBed.configureTestingModule({
//       declarations: [ListEmployeeComponent],
//       imports: [RouterTestingModule, AgGridModule, HttpClientTestingModule],
//       providers: [
//         { provide: EmployeeService, useValue: employeeServiceSpy }
//       ]
//     });

//     fixture = TestBed.createComponent(ListEmployeeComponent);
//     component = fixture.componentInstance;
//     employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
//     router = TestBed.inject(Router);

//     employeeService.getEmployees.and.returnValue(of(mockEmployees));

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

// });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ListEmployeeComponent } from './list-employee.component';
// import { EmployeeService } from 'src/service/employee.service';
// import { Employee } from 'src/model/employee.model';
// import { Observable, of } from 'rxjs';

// describe('ListEmployeeComponent', () => {
//   let component: ListEmployeeComponent;
//   let fixture: ComponentFixture<ListEmployeeComponent>;
//   let mockEmployeeService: jasmine.SpyObj<EmployeeService>;

//   const mockEmployees: Employee[] = [
//     { id: '1', name: 'John Doe', position: 'Engineer', hiringDate: new Date(), salary: 50000 },
//     { id: '2', name: 'Jane Smith', position: 'Designer', hiringDate: new Date(), salary: 60000 }
//   ];

//   beforeEach(() => {
//     mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['getEmployees']);
//     TestBed.configureTestingModule({
//       declarations: [ListEmployeeComponent],
//       providers: [{ provide: EmployeeService, useValue: mockEmployeeService }]
//     });

//     fixture = TestBed.createComponent(ListEmployeeComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load employees on initialization', () => {
//     mockEmployeeService.getEmployees.and.returnValue(of(mockEmployees));

//     component.ngOnInit();

//     expect(component.employees).toEqual(mockEmployees);
//   });

//   it('should remove employee on employee deletion', () => {
//     const deletedId = '1';
//     mockEmployeeService.employeeSubjectId$ = of(deletedId);

//     component.subcribeEmployeeDeleted();

//     expect(component.employees.length).toBe(1);
//     expect(component.employees.every(e => e.id !== deletedId)).toBeTrue();
//   });
// });


