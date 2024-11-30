import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vet-dashboard',
  standalone: false,
  templateUrl: './vet-dashboard.component.html',
  styleUrls: ['./vet-dashboard.component.scss']
})
export class VetDashboardComponent {
  activeTab: number = 0;  // Default to the first tab
  profileImage: string = '/img/team/kasuku.png';  // User profile image path

  constructor(private router: Router) { }

  // Method to handle logout action
  logout(): void {
    this.router.navigate(['/vet-login']);
  }

  // Method to navigate to the "My Profile" page
  goToProfile(): void {
    this.router.navigate(['/vet-my-profile']);
  }
}
