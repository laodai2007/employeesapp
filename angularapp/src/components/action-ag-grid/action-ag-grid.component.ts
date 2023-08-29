import { Component } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from "../delete-confirmation-dialog/delete-confirmation-dialog.component";
import { Employee } from "src/model/employee.model";
import { EmployeeService } from "src/service/employee.service";
import { tap, catchError } from 'rxjs'
import { ToastrService } from 'ngx-toastr';
import { globalCacheBusterNotifier } from 'ts-cacheable';

@Component({
    selector: 'action-render',
    template: `
    <div class="action-row">
        <button (click)="editClick($event)" mat-icon-button color="warn" aria-label="edit" matTooltip="Edit">
            <mat-icon>edit</mat-icon>
        </button>
        <button (click)="deleteClick()" mat-icon-button color="warn" aria-label="edit" matTooltip="Delete">
            <mat-icon>delete</mat-icon>
        </button>
    </div>
    `,
    standalone: true,
    imports: [MatButtonModule, MatDividerModule, MatIconModule, MatTooltipModule]
})
export class ActionRenderComponent implements ICellRendererAngularComp {
    constructor(
        private router: Router,
        private employeeService: EmployeeService,
        private dialog: MatDialog,
        private toastr: ToastrService
    ) {}

    id!: string;
    employee!: Employee;

    agInit(params: ICellRendererParams): void {
        this.id = params.data.id;
        this.employee = params.data;
    }

    refresh(): boolean {
        return true;
    }

    editClick(e: any) {
        this.router.navigate(['/edit', this.id]);
    }

    deleteClick() {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
          data: this.id
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.deleteEmployee(this.id);
          }
        });
    }
    
    deleteEmployee(id: string) {
        this.employeeService.deleteEmployee(id).pipe(
            tap(() => {
                globalCacheBusterNotifier.next();
                this.toastr.success('Delete employee successfully!');
                this.employeeService.notifyEmployeeDeleted(id);
            }),
            catchError((error): any => {
                console.error('Error delete employee:', error, error.status);
                this.toastr.error(error.message, "Delete failed");
            }),
        ).subscribe();
    }
}