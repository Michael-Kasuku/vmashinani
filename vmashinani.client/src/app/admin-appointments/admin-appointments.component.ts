import { Component, OnInit } from '@angular/core';

interface Appointment {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  timeSent: Date;
  status: 'approved' | 'canceled' | 'pending';
  remarks: Remark[];
}

interface Remark {
  id: string;
  author: string;
  message: string;
  timeMade: Date;
}

@Component({
  selector: 'app-admin-appointments',
  standalone: false,
  templateUrl: './admin-appointments.component.html',
  styleUrls: ['./admin-appointments.component.scss']
})
export class AdminAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  approvedCount = 0;
  canceledCount = 0;
  pendingCount = 0;
  totalRemarks = 0;

  constructor() { }

  ngOnInit(): void {
    this.fetchAppointments();
    this.calculateAnalytics();
  }

  fetchAppointments(): void {
    this.appointments = [
      {
        id: '1',
        sender: 'Alice',
        receiver: 'Dr. John',
        content: 'Appointment for livestock checkup.',
        timeSent: new Date('2024-11-25T10:00:00'),
        status: 'approved',
        remarks: [
          { id: '1', author: 'Alice', message: 'Can we confirm the time?', timeMade: new Date('2024-11-25T11:00:00') },
          { id: '2', author: 'Dr. John', message: 'Confirmed, see you then.', timeMade: new Date('2024-11-25T12:00:00') },
        ],
      },
      {
        id: '2',
        sender: 'Bob',
        receiver: 'Dr. Emma',
        content: 'Requesting a vet visit for vaccination.',
        timeSent: new Date('2024-11-26T15:00:00'),
        status: 'canceled',
        remarks: [
          { id: '3', author: 'Bob', message: 'Can we reschedule?', timeMade: new Date('2024-11-26T16:00:00') },
        ],
      },
      {
        id: '3',
        sender: 'Clara',
        receiver: 'Dr. Smith',
        content: 'Follow-up on calf treatment.',
        timeSent: new Date('2024-11-27T14:00:00'),
        status: 'pending',
        remarks: [],
      },
    ];
  }

  calculateAnalytics(): void {
    this.approvedCount = this.appointments.filter(appointment => appointment.status === 'approved').length;
    this.canceledCount = this.appointments.filter(appointment => appointment.status === 'canceled').length;
    this.pendingCount = this.appointments.filter(appointment => appointment.status === 'pending').length;
    this.totalRemarks = this.appointments.reduce((total, appointment) => total + appointment.remarks.length, 0);
  }
}
