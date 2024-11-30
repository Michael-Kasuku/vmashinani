import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-signup',
  standalone:false,
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss'],
})
export class AdminSignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^(07\d{8}|01\d{8}|\+2547\d{8}|\+2541\d{8})$/)]],
        password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,}$/)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    const { username, email, phone, password } = this.signupForm.value;

    this.http.post('https://localhost:40443/admin-signup', { username, email, phone, password })
      .subscribe({
        next: () => {
          this.isLoading = false;
          alert('Sign-up successful');
          this.router.navigate(['/admin-login']);
        },
        error: () => {
          this.isLoading = false;
          alert('Sign-up failed. Please try again.');
        },
      });
  }
}
