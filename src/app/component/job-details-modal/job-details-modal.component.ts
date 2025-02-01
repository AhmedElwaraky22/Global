import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-job-details-modal',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './job-details-modal.component.html',
  styleUrl: './job-details-modal.component.css'
})
export class JobDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<JobDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public job: any // Inject job data
  ) {}




  
  // Close the modal
  closeModal(): void {
    this.dialogRef.close();
  }

  // Handle "Apply" button click
  applyForJob(): void {
    console.log('Applied for job:', this.job.title);
    // Add your logic here
  }

  saveJob(): void {
    console.log('Saved job:', this.job.title);
    // Add your logic here
  }
}
