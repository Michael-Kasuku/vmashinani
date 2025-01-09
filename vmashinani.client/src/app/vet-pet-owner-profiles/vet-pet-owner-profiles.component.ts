import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

export interface PetOwnerProfile {
  id: number;
  name: string;
  jobTitle: string;
  location: string;
  email: string;
  profilePicture: {
    fileContents: string;
    contentType: string;
  } | null; // Can be null if no picture is provided
}

@Component({
  selector: 'app-vet-pet-owner-profiles',
  standalone: false,
  templateUrl: './vet-pet-owner-profiles.component.html',
  styleUrl: './vet-pet-owner-profiles.component.scss'
})
export class VetPetOwnerProfilesComponent implements OnInit {
  petOwnerProfiles: PetOwnerProfile[] = [];
  filteredProfiles: PetOwnerProfile[] = [];
  profileImage: string = '/img/vmashinani.png'; // Default profile image
  searchQuery: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer // Inject DomSanitizer to sanitize the URL
  ) { }

  ngOnInit(): void {
    this.fetchPetOwners();
  }

  fetchPetOwners(): void {
    const url = `${environment.baseUrl}api/account/getpetowner`;
    this.http.get<PetOwnerProfile[]>(url, { responseType: 'json' }).subscribe({
      next: (data) => {
        this.petOwnerProfiles = data;
        this.filteredProfiles = data;
        this.openSnackbar('Pet Owner Profiles Loaded Successfully!', 'success');
      },
      error: () => {
        this.openSnackbar('Failed to load Pet Owner Profiles!', 'error');
      },
    });
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }

  getProfileImageUrl(petOwner: PetOwnerProfile): string {
    if (petOwner.profilePicture && petOwner.profilePicture.fileContents) {
      return `data:${petOwner.profilePicture.contentType};base64,${petOwner.profilePicture.fileContents}`;
    } else {
      return this.profileImage; // Default profile image
    }
  }

  onSearch(): void {
    this.filteredProfiles = this.petOwnerProfiles.filter(petOwner =>
      petOwner.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      petOwner.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  message(petOwner: PetOwnerProfile): void {
    // Store the Pet Owner profile in local storage
    localStorage.setItem('pet', JSON.stringify(petOwner));

    // Navigate to chat page and pass the vet profile and sender email
    this.router.navigate(['/vet-chat']);
  }
}
