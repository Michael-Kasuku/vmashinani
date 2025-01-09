import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

export interface VetProfile {
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
  selector: 'app-pet-owner-vet-profiles',
  standalone: false,
  templateUrl: './pet-owner-vet-profiles.component.html',
  styleUrls: ['./pet-owner-vet-profiles.component.scss']
})
export class PetOwnerVetProfilesComponent implements OnInit {
  vetProfiles: VetProfile[] = [];
  filteredProfiles: VetProfile[] = [];
  profileImage: string = '/img/vmashinani.png'; // Default profile image
  searchQuery: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer // Inject DomSanitizer to sanitize the URL
  ) { }

  ngOnInit(): void {
    this.fetchVets();
  }

  fetchVets(): void {
    const url = `${environment.baseUrl}api/account/getvet`;
    this.http.get<VetProfile[]>(url, { responseType: 'json' }).subscribe({
      next: (data) => {
        this.vetProfiles = data;
        this.filteredProfiles = data;
        this.openSnackbar('Vet Profiles Loaded Successfully!', 'success');
      },
      error: () => {
        this.openSnackbar('Failed to load Vet Profiles!', 'error');
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

  getProfileImageUrl(vet: VetProfile): string {
    if (vet.profilePicture && vet.profilePicture.fileContents) {
      return `data:${vet.profilePicture.contentType};base64,${vet.profilePicture.fileContents}`;
    } else {
      return this.profileImage; // Default profile image
    }
  }

  onSearch(): void {
    this.filteredProfiles = this.vetProfiles.filter(vet =>
      vet.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vet.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  message(vet: VetProfile): void {
    // Store the vet profile in local storage
    localStorage.setItem('vet', JSON.stringify(vet));

    // Navigate to chat page and pass the vet profile and sender email
    this.router.navigate(['/chat']);
  }
}
