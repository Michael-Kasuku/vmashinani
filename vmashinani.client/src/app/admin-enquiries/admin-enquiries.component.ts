import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Enquiry {
  id: number;
  subject: string;
  sent_by: string;
  sender_email: string;
  content: string;
  time_sent: string;
}

const ENQUIRIES_DATA: Enquiry[] = [
  { id: 1, subject: 'System Inquiry', sent_by: 'Josphine Otieno', sender_email: 'josphineotieno@gmail.com', content: 'How can I reset my password?', time_sent: '2024-11-28 10:45 AM' },
  { id: 2, subject: 'Feature Request', sent_by: 'Michael Kasuku', sender_email: 'michaelkasuku@gmail.com', content: 'Can you add a dark mode?', time_sent: '2024-11-27 3:12 PM' },
  { id: 3, subject: 'Bug Report', sent_by: 'Daisy Lopez', sender_email: 'daisylopez@gmail.com', content: 'There is an error on the login page.', time_sent: '2024-11-26 6:45 PM' },
  { id: 3, subject: 'Progress Report', sent_by: 'Donatus Njoroge', sender_email: 'donatusnjoroge@gmail.com', content: 'So far where have you reached with your project?', time_sent: '2024-11-27 8:45 PM' },
];

@Component({
  selector: 'app-admin-enquiries',
  standalone: false,
  templateUrl: './admin-enquiries.component.html',
  styleUrls: ['./admin-enquiries.component.scss']
})
export class AdminEnquiriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'subject', 'sent_by', 'sender_email', 'content', 'time_sent'];
  dataSource = new MatTableDataSource<Enquiry>(ENQUIRIES_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
