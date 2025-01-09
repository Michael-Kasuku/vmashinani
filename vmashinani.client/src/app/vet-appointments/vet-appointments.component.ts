import { Component } from '@angular/core';

@Component({
  selector: 'app-vet-appointments',
  standalone: false,
  templateUrl: './vet-appointments.component.html',
  styleUrls: ['./vet-appointments.component.scss']
})
export class VetAppointmentsComponent {
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
    console.log('View Appointment for:', vetId);
    // Implement your view details functionality here
  }
}
