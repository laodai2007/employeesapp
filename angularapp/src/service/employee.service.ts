import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { Employee } from 'src/model/employee.model';
import { CacheBuster, Cacheable } from 'ts-cacheable';
import { environment } from 'src/environments/environment.development';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  public apiUrl = environment.apiUrl;
  private readonly apiControllerUrl = `${this.apiUrl}/api/employees/`;
  public employeeDeletedSubject = new Subject<string>();

  employeeSubjectId$ = this.employeeDeletedSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Implement caching to cache all employees
  @Cacheable()
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiControllerUrl)
  }

  @Cacheable()
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiControllerUrl}${id}`);
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  addEmployee(employee: Employee): Observable<void> {
    return this.http.post<void>(this.apiControllerUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiControllerUrl}${employee.id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiControllerUrl}${id}`);
  }

  notifyEmployeeDeleted(id: string) {
    this.employeeDeletedSubject.next(id);
  }
}