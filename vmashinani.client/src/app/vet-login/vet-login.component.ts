import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vet-login',
  standalone: false,
  templateUrl: './vet-login.component.html',
  styleUrls: ['./vet-login.component.scss']
})
export class VetLoginComponent {
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
      .post('https://localhost:40443/api/vet-login', {
        username: this.username,
        password: this.password
      })
      .subscribe(
        () => {
          this.isLoading = false;
          alert('Login successful');
          this.router.navigate(['/admin-dashboard']);
        },
        (error) => {
          this.isLoading = false;
          this.submissionError =
            error.error?.message || 'Login failed. Please try again.';
        }
      );
  }
}
