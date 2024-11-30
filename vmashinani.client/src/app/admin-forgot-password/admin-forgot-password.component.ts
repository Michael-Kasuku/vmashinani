import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-forgot-password',
  standalone:false,
  templateUrl: './admin-forgot-password.component.html',
  styleUrls: ['./admin-forgot-password.component.scss'],
})
export class AdminForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  submissionError: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email address is required.';
    }
    if (this.email?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    this.isLoading = true;
    this.submissionError = '';

    const { email } = this.forgotPasswordForm.value;

    this.http
      .post('https://localhost:40443/api/admin-forgot-password', {
        email,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          alert('Password reset link sent successfully');
          this.router.navigate(['/admin-login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.submissionError =
            'Failed to send password reset link. Please try again.';
          console.error('There was an error!', err);
        },
      });
  }
}
