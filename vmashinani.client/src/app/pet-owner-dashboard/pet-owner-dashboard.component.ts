import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-owner-dashboard',
  standalone: false,
  templateUrl: './pet-owner-dashboard.component.html',
  styleUrls: ['./pet-owner-dashboard.component.scss']
})
export class PetOwnerDashboardComponent {
  activeTab: number = 0;  // Default to the first tab
  profileImage: string = '/img/team/kasuku.png';  // User profile image path

  constructor(private router: Router) { }

  // Method to handle logout action
  logout(): void {
    this.router.navigate(['/pet-owner-login']);
  }

  // Method to navigate to the "My Profile" page
  goToProfile(): void {
    this.router.navigate(['/pet-owner-my-profile']);
  }
}
