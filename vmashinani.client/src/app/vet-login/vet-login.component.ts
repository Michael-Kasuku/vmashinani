import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vet-login',
  standalone: false,
  templateUrl: './vet-login.component.html',
  styleUrls: ['./vet-login.component.scss']
})
export class VetLoginComponent {
  formData = {
    Email: '',
    PasswordHash: '',
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  handleLogin(event: Event) {
    event.preventDefault();

    // Basic Validation
    if (!this.formData.Email || !this.formData.PasswordHash) {
      this.openSnackbar('Both fields are required.', 'error');
      return;
    }

    // HTTP Request for Login
    this.http.post('https://localhost:40443/api/vet/login', {
      Email: this.formData.Email,
      PasswordHash: this.formData.PasswordHash,
    })
      .subscribe(
        (response: any) => {
          // Handle successful login, assuming a token is returned
          localStorage.setItem('vetToken', response.token); // Save the token locally
          this.openSnackbar('Login successful!', 'success');
          this.router.navigate(['/vet-dashboard']); // Redirect to vet dashboard
        },
        (error) => {
          // Handle error response
          if (error.error && error.error.message) {
            this.openSnackbar(error.error.message, 'error');
          } else {
            this.openSnackbar('Login failed. Please check your credentials.', 'error');
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
