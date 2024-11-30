import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  activeTab: number = 0;  // Default to the first tab
  profileImage: string = '/img/team/kasuku.png';  // User profile image path

  constructor(private router: Router) { }

  // Method to handle logout action
  logout(): void {
    this.router.navigate(['/admin-login']);
  }

  // Method to navigate to the "My Profile" page
  goToProfile(): void {
    this.router.navigate(['/admin-my-profile']);
  }
}
