import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { LoginRequest } from '../auth/login-request';
import { LoginResult } from '../auth/login-result';

@Component({
  selector: 'app-pet-owner-login',
  standalone: false,
  templateUrl: './pet-owner-login.component.html',
  styleUrls: ['./pet-owner-login.component.scss']
})
export class PetOwnerLoginComponent {
  title = 'Pet Owner Login';
  loginResult?: LoginResult;

  formData = {
    Email: '',
    Password: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService, // Inject AuthService
    private snackBar: MatSnackBar
  ) { }

  // Handles the login process
  handleLogin() {
    // Basic validation for empty fields
    if (!this.formData.Email || !this.formData.Password) {
      this.openSnackbar('Both fields are required.', 'error');
      return;
    }

    // Prepare the login request object
    const loginRequest: LoginRequest = {
      email: this.formData.Email,
      password: this.formData.Password,
    };

    // Call the AuthService login method
    this.authService.login(loginRequest).subscribe({
      next: (result) => {
        this.loginResult = result;

        if (result.success) {
          //Display the email address in the console
          console.log(localStorage.getItem('email'));

          // Successful login
          this.openSnackbar('Login successful!', 'success');

          // Extract the `redirectTo` query parameter
          const redirectTo = this.activatedRoute.snapshot.queryParamMap.get('redirectTo') || '/pet-owner-dashboard';

          // Navigate to the originally requested URL or default to the admin dashboard
          this.router.navigate([redirectTo]);
        } else {
          // Login failed (e.g., incorrect credentials)
          this.openSnackbar(result.message || 'Login failed.', 'error');
        }
      },
      error: () => {
        // Handle server or network errors
        this.openSnackbar('Login failed. Please check your credentials.', 'error');
      },
    });
  }

  // Utility method to show snackbar notifications
  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }
}
