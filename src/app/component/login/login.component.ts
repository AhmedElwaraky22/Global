import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // Initialize the login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      const formData = new FormData();
      formData.append('email', this.loginForm.get('email')?.value);
      formData.append('password', this.loginForm.get('password')?.value);
      console.log('Form Data:', this.loginForm.value);
  
      this.toastr.success('Login successful!', 'Success', {
        timeOut: 2000, 
        positionClass: 'toast-top-right', 
        closeButton: true, 
      });
  
      setTimeout(() => {
        window.location.href = '/home'; 
      }, 2000); 
  
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Invalid Form',{
        timeOut: 2000, 
        positionClass: 'toast-top-right', 
        closeButton: true,
      });
    }
  }

}
