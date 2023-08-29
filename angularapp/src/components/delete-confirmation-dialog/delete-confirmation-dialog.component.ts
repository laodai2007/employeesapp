import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../model/employee.model'; // Import your Employee model

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: 'delete-confirmation-dialog.component.html'
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    console.log(data);
  }
  
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}