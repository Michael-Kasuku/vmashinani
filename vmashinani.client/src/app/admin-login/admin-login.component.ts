import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { LoginRequest } from '../auth/login-request';
import { LoginResult } from '../auth/login-result';

@Component({
  selector: 'app-admin-login',
  standalone:false,
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  title?: string;
  loginResult?: LoginResult;

  formData = {
    Email: '',
    Password: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  handleLogin() {
    // Basic Validation
    if (!this.formData.Email || !this.formData.Password) {
      this.openSnackbar('Both fields are required.', 'error');
      return;
    }

    var loginRequest = <LoginRequest>{};
    loginRequest.Email = this.formData.Email;
    loginRequest.Password = this.formData.Password;

    this.authService
      .login(loginRequest)
      .subscribe({
        next: (result) => {
          this.loginResult = result
          this.openSnackbar('Login successful!', 'success');
          this.router.navigate(["/admin-dashboard"]);
        },
        error: (error) => {
          this.openSnackbar('Login failed. Please check your credentials.', 'error');
          return;
          }
      });
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
