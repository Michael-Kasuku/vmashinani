import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pet-owner-login',
  standalone: false,
  templateUrl: './pet-owner-login.component.html',
  styleUrls: ['./pet-owner-login.component.scss']
})
export class PetOwnerLoginComponent {
  username = '';
  password = '';
  showPassword = false;
  isLoading = false;
  submissionError = '';

  constructor(private router: Router, private http: HttpClient) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.submissionError = 'Username and password are required.';
      return;
    }

    this.isLoading = true;
    this.submissionError = '';

    this.http
      .post('https://localhost:40443/api/pet-owner-login', {
        username: this.username,
        password: this.password
      })
      .subscribe(
        () => {
          this.isLoading = false;
          alert('Login successful');
          this.router.navigate(['/pet-owner-dashboard']);
        },
        (error) => {
          this.isLoading = false;
          this.submissionError =
            error.error?.message || 'Login failed. Please try again.';
        }
      );
  }
}
