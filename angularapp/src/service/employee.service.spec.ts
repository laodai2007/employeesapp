import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/model/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve employees from the API', () => {
    const mockEmployees = [
      { id: "05e833b8-cd86-472e-a440-08db999a7231", name: 'John', position: 'Developer', hiringDate: new Date('2023-01-01'), salary: 50000 },
      { id: "05e833b8-cd86-472e-a440-08db999a7232", name: 'Jane', position: 'Designer', hiringDate: new Date('2023-02-01'), salary: 60000 }
    ];

    service.getEmployees().subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/employees/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should retrieve an employee by ID from the API', () => {
    const mockEmployee: Employee = { id: "05e833b8-cd86-472e-a440-08db999a7231", name: 'John', position: 'Developer', hiringDate: new Date('2023-01-01'), salary: 50000 };

    service.getEmployeeById('05e833b8-cd86-472e-a440-08db999a7231').subscribe((employee) => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/employees/05e833b8-cd86-472e-a440-08db999a7231`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should notify when an employee is deleted', () => {
    const idToDelete = '05e833b8-cd86-472e-a440-08db999a7231';
    const spy = spyOn(service.employeeDeletedSubject, 'next');

    service.notifyEmployeeDeleted(idToDelete);

    expect(spy).toHaveBeenCalledWith(idToDelete);
  });


  it('should add an employee using the API', () => {
    const newEmployee: Employee = { id: "05e833b8-cd86-472e-a440-08db999a7231", name: 'John', position: 'Developer', hiringDate: new Date('2023-01-01'), salary: 50000 };

    service.addEmployee(newEmployee).subscribe(() => {
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/employees/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);
    req.flush(null);
  });

  it('should update an employee using the API', () => {
    const updatedEmployee: Employee = { id: "05e833b8-cd86-472e-a440-08db999a7231", name: 'John', position: 'Developer', hiringDate: new Date('2023-01-01'), salary: 50000 };

    service.updateEmployee(updatedEmployee).subscribe(() => {
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/employees/05e833b8-cd86-472e-a440-08db999a7231`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEmployee);
    req.flush(null);
  });

  it('should delete an employee using the API', () => {
    const idToDelete = '05e833b8-cd86-472e-a440-08db999a7231';

    service.deleteEmployee(idToDelete).subscribe(() => {
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/employees/05e833b8-cd86-472e-a440-08db999a7231`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});
