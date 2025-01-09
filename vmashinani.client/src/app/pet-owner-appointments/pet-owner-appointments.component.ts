import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-owner-appointments',
  standalone: false,
  templateUrl: './pet-owner-appointments.component.html',
  styleUrls: ['./pet-owner-appointments.component.scss']
})
export class PetOwnerAppointmentsComponent {
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

  ViewAppointment(vetId: number): void {
    console.log('View Appointment with:', vetId);
    // Implement your view details functionality here
  }
}
