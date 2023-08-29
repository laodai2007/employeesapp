import { Component } from '@angular/core';
import { EmployeeService } from 'src/service/employee.service';
import { Employee } from 'src/model/employee.model';
import { ColDef } from 'ag-grid-community';
import { ActionRenderComponent } from 'src/components/action-ag-grid/action-ag-grid.component';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-list-employee',
  templateUrl: 'list-employee.component.html',
})
export class ListEmployeeComponent {
  errorMessage = '';
  employees: Employee[] = [];
  columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'position' },
    {
      field: 'hiringDate',
      valueFormatter: (params) => {
        if (params.value) {
          return moment(params.value).format('YYYY-MM-DD');
        }
        return '';
      },
    },
    { field: 'salary' },
    { field: 'action', cellRenderer: ActionRenderComponent, sortable: false, filter: false }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  title = 'angularapp';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployee();
    this.subcribeEmployeeDeleted();
  }

  loadEmployee(): void {
    this.employeeService.getEmployees().subscribe(employees => { this.employees = employees; }
    );
  }

  private subcribeEmployeeDeleted() {
    this.employeeService.employeeSubjectId$.subscribe(id => {
      this.employees = this.employees.filter(x => x.id != id);
    })
  }

  onAddNewEmployee() {
    this.router.navigate(['/add']);
  }
}