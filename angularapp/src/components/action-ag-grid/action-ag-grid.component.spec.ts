import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionRenderComponent } from './action-ag-grid.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeService } from 'src/service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';


describe('ActionRenderComponent', () => {
  let component: ActionRenderComponent;
  let fixture: ComponentFixture<ActionRenderComponent>;
  let mockRouter: any;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['deleteEmployee', 'notifyEmployeeDeleted']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      //declarations: [ActionRenderComponent],
      imports: [MatIconModule, MatButtonModule, RouterTestingModule, AgGridModule],
      providers: [
        ActionRenderComponent,
        { provide: Router, useValue: mockRouter },
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    });

    fixture = TestBed.createComponent(ActionRenderComponent);
    component = fixture.componentInstance;
    component.id = 'testId';
    component.employee = { id: 'testId', name: 'John Doe', position: 'Software Engineer', hiringDate: new Date(), salary: 21 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit page on editClick', () => {
    component.editClick(null);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit', 'testId']);
  });
});
