import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditEmployeeComponent } from 'src/components/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from 'src/components/list-employee/list-employee.component';
import { AddEmployeeComponent } from 'src/components/add-employee/add-employee.component';


const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: ListEmployeeComponent },
  { path: 'edit/:id', component: EditEmployeeComponent },
  { path: 'add', component: AddEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }