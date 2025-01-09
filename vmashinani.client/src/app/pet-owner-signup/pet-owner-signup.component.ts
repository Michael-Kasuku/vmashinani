import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-pet-owner-signup',
  standalone: false,
  templateUrl: './pet-owner-signup.component.html',
  styleUrls: ['./pet-owner-signup.component.scss'],
})
export class PetOwnerSignupComponent {
  formData = {
    FullName: '',
    JobTitle: '',
    Location: '',
    Email: '',
    PasswordHash: '',
    ConfirmPassword: '',
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  handleSubmit(event: Event) {
    event.preventDefault();

    // Basic Validation
    if (
      !this.formData.FullName ||
      !this.formData.JobTitle ||
      !this.formData.Location ||
      !this.formData.Email ||
      !this.formData.PasswordHash ||
      !this.formData.ConfirmPassword
    ) {
      this.openSnackbar('All fields are required.', 'error');
      return;
    }

    // Password Length and Alphanumeric Validation
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;

    if (!passwordRegex.test(this.formData.PasswordHash)) {
      this.openSnackbar(
        'Password must be at least 8 characters long and contain both letters, numbers and special symbols.',
        'error'
      );
      return;
    }

    // Password Match Validation
    if (this.formData.PasswordHash !== this.formData.ConfirmPassword) {
      this.openSnackbar('Passwords do not match.', 'error');
      return;
    }
    const url = `${environment.baseUrl}api/petowner/createpetowner`
    // HTTP Request
    this.http.post(url,
      {
        FullName: this.formData.FullName,
        JobTitle: this.formData.JobTitle,
        Location: this.formData.Location,
        Email: this.formData.Email,
        PasswordHash: this.formData.PasswordHash
      }
    ).subscribe(
      () => {
        this.openSnackbar('Pet Owner Account created successfully!', 'success');
        this.router.navigate(['/pet-owner-login']);
      },
      (error) => {
        // Handle Error Response
        if (error.error && error.error.message) {
          this.openSnackbar(error.error.message, 'error');
        } else if (error.error && error.error.errors) {
          // Extract and concatenate all error messages
          const errorMessages = error.error.errors.map((err: any) => err.description).join('\n');
          this.openSnackbar(errorMessages, 'error');
        } else {
          this.openSnackbar('Error in creating Pet Owner Account. Please try again.', 'error');
        }
      }
    );
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
