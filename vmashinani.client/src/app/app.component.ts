import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) { } // Inject Router service

  // Use the Router service to navigate between routes
  navigateTo(route: string): void {
    this.router.navigate([route]); // Navigate using the router
  }
}
