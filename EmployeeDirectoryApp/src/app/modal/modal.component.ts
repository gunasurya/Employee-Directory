import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataSharingService } from '../services/data-sharing.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeDataService } from '../services/employee-data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  departments: Array<string> = [];
  offices: Array<string> = [];
  jobTitles: Array<string> = [];
  isEditMode: boolean = false;
  employeeForm: FormGroup;
  uploadedImageUrl?: string;
  isImageUploaded: boolean = false;
  isActiveMode?: boolean;
  isAddMode: boolean = true;

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public employeeService: EmployeeService,
    public dataService: EmployeeDataService,
    private fb: FormBuilder
  ) {
    // Initialize the form group and set up form controls with validators
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', Validators.maxLength(10)],
      email: ['', Validators.email],
      jobTitle: ['', Validators.required],
      office: ['', Validators.required],
      department: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[789]\d{9}$/)],
      ],
      skypeId: ['', Validators.required],
    });

    // Disable the form if it's in edit mode
    if (this.data.isEditMode) {
      this.employeeForm.disable();
    }
  }

  // Clear the form inputs
  clearForm() {
    this.employeeForm.reset();
  }

  ngOnInit() {
    this.isActiveMode = this.data.isAddMode ? false : true;
    if (this.data.empData) {
      this.employeeForm.patchValue(this.data.empData);
    }
    // Subscribe to departments updates from the data sharing service
    this.departments = this.dataService.deptArray;
    // Subscribe to offices updates from the data sharing service
    this.offices = this.dataService.officeArray;
    // Subscribe to job titles updates from the data sharing service
    this.jobTitles = this.dataService.jobTitleArray;
    this.openDialog();
  }

  // Handle file input change event
  onChangeFile(event: Event) {
    const file = event.target as HTMLInputElement | null;
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.uploadedImageUrl = reader.result as string;
      },
      false
    );

    if (file && file.files) {
      this.isImageUploaded = true;
      reader.readAsDataURL(file.files[0]);
    } else {
      this.isImageUploaded = false;
    }
  }

  // Submit the employee form
  submitForm() {
    // Check if the form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    // Set the uploaded image URL to the previous value if no new image is uploaded
    if (!this.uploadedImageUrl) {
      // Image input field is null, set uploadedImageUrl to the previous value
      this.uploadedImageUrl = this.data.empData.image;
    }

    // Create an Employee object with form values
    const employee: Employee = {
      id: Date.now().toString(),
      image: this.uploadedImageUrl,
      ...this.employeeForm.value,
    };

    // Check if it's an edit mode or add mode
    if (this.data.empData) {
      const employeeId = this.data.empData.id;
      employee.id = employeeId; // Set the existing ID instead of generating a new one

      // Update the employee using the EmployeeService
      this.employeeService.updateEmployee(employeeId, employee).subscribe(
        (res) => {
          this.employeeService.notifyEmployeeUpdated();
          this.dataSharingService.openSnackBar(res.errorMessage);
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
          this.dataSharingService.openSnackBar(error); // Display the custom error message from the service
          this.dialogRef.close();
        }
      );
    } else {
      // Add a new employee using the EmployeeService
      this.employeeService.addEmployee(employee).subscribe(
        (res) => {
          this.clearForm();
          this.employeeService.notifyEmployeeAdded();
          this.dataSharingService.openSnackBar(res.errorMessage);
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
          this.dataSharingService.openSnackBar(error); // Display the custom error message from the service
          this.dialogRef.close();
        }
      );
    }
  }
  // Enable edit mode
  enableEditMode() {
    this.employeeForm.enable();
    this.isEditMode = true;
    this.isActiveMode = false;
  }

  openDialog(): void {
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.router.navigate(['/employees']);
    });
  }

  // Getter methods for form controls
  get firstNameControl(): FormControl {
    return this.employeeForm.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.employeeForm.get('lastName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.employeeForm.get('email') as FormControl;
  }

  get phoneNumberControl(): FormControl {
    return this.employeeForm.get('phoneNumber') as FormControl;
  }

  get jobTitleControl(): FormControl {
    return this.employeeForm.get('jobTitle') as FormControl;
  }

  get officeControl(): FormControl {
    return this.employeeForm.get('office') as FormControl;
  }

  get departmentControl(): FormControl {
    return this.employeeForm.get('department') as FormControl;
  }

  get skypeIdControl(): FormControl {
    return this.employeeForm.get('skypeId') as FormControl;
  }
}
