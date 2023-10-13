import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})

export class AddEditEmpComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = ['BA', 'BCA', 'MCA', 'BBA', 'MSCITC', 'BSC']

  constructor(private fb: FormBuilder, private service: ServiceService, private dialogref: MatDialogRef<AddEditEmpComponent> ,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      companyname: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  
  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data){
        this.service.updateEmployee(this.data.id ,this.empForm.value).subscribe({
          next: (response) => {
            alert("Employee Updated Successfully");
            console.log(response);
            this.dialogref.close(true);
          },
          error: (err) => {
            console.error("Error adding employee:", err);
            alert("Error: " + err.message);
          },
        })
      }
      else{
        // const formData = this.empForm.value;
        this.service.addEmployee(this.empForm.value).subscribe({
          next: (response) => {
            alert("Employee Added Successfully");
            console.log(response);
            this.dialogref.close(true);
          },
          error: (err) => {
            console.error("Error adding employee:", err);
            alert("Error: " + err.message);
          },
        })
      }  
    }
  }
}