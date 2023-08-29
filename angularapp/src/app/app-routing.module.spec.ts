import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { EditEmployeeComponent } from 'src/components/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from 'src/components/list-employee/list-employee.component';
import { AppRoutingModule } from './app-routing.module';
import { AddEmployeeComponent } from 'src/components/add-employee/add-employee.component';

describe('AppRoutingModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AppRoutingModule,
      ],
      declarations: [
        AppComponent,
        EditEmployeeComponent,
        ListEmployeeComponent,
        AddEmployeeComponent
      ],
    });
  });

  it('should navigate to employee list component for empty path', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should navigate to employee list component for "/employees" path', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should navigate to employee edit component for "/edit/:id" path', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should navigate to employee edit component for "/view/:id" path', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
