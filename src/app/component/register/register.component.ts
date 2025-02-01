import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
      }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('confirmPassword', this.registerForm.get('confirmPassword')?.value);
      console.log('Form Submitted!', formData);

      this.toastr.success('Register successful!', 'Success', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        closeButton: true,
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);


    } else {this.toastr.error('Please fill out the form correctly.', 'Invalid Form',{
      timeOut: 2000,
      positionClass: 'toast-top-right',
      closeButton: true,
    });
    }
  }



















}
