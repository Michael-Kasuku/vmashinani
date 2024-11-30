import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-my-profile',
  standalone: false,
  templateUrl: './admin-my-profile.component.html',
  styleUrls: ['./admin-my-profile.component.scss'],
})
export class AdminMyProfileComponent {
  profileForm: FormGroup;
  profilePicturePreview: string | ArrayBuffer | null = null;

  // Mock data for the user profile
  username: string = 'Kasuku';
  email: string = 'michaelkasuku@gmail.com';
  gender: string = 'Male';
  role: string = 'Administrator';
  location: string = 'Nairobi, Kenya';

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      profilePicture: [null, Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileForm.patchValue({ profilePicture: file });
      this.profileForm.get('profilePicture')?.updateValueAndValidity();

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => (this.profilePicturePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      const updatedProfile = new FormData();
      updatedProfile.append(
        'profilePicture',
        this.profileForm.get('profilePicture')?.value
      );

      // Replace this console.log with a service call to save profile updates
      console.log('Profile updated successfully', updatedProfile);

      alert('Profile updated successfully!');
    } else {
      alert('Please select a profile picture before submitting.');
    }
  }
}
