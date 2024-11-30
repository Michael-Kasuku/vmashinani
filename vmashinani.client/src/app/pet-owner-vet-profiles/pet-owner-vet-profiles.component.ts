import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-owner-vet-profiles',
  standalone: false,
  templateUrl: './pet-owner-vet-profiles.component.html',
  styleUrls: ['./pet-owner-vet-profiles.component.scss']
})
export class PetOwnerVetProfilesComponent {
  vetProfiles = [
    {
      id: 1,
      name: 'Dr. Josphine Otieno',
      specialization: 'Veterinary Surgeon',
      location: 'Kisumu',
      contact: '0700123456',
      profilePictureUrl: '/img/vets/josphine.png'
    },
    {
      id: 2,
      name: 'Dr. Michael Kasuku',
      specialization: 'Animal Behaviorist',
      location: 'Nairobi',
      profilePictureUrl: '/img/vets/kasuku.png'
    },
    {
      id: 3,
      name: 'Dr. Daisy Lopez',
      specialization: 'Animal Behaviorist',
      location: 'Nairobi',
      profilePictureUrl: '/img/vets/lopez.png'
    }
  ];

  BookAppointment(vetId: number): void {
    console.log('Book Appointment with:', vetId);
    // Implement your view details functionality here
  }
}
