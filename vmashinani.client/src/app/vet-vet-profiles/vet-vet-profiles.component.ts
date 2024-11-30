import { Component } from '@angular/core';

@Component({
  selector: 'app-vet-vet-profiles',
  standalone: false,
  templateUrl: './vet-vet-profiles.component.html',
  styleUrls: ['./vet-vet-profiles.component.scss']
})
export class VetVetProfilesComponent {
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
