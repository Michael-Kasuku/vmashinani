import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from './../../environments/environment';

export interface Enquiry {
  id: number;
  sentBy: string;
  subject: string;
  senderEmail: string;
  content: string;
  timeSent: string;
}

@Component({
  selector: 'app-admin-enquiries',
  standalone: false,
  templateUrl: './admin-enquiries.component.html',
  styleUrls: ['./admin-enquiries.component.scss']
})
export class AdminEnquiriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sentBy', 'subject', 'senderEmail', 'content', 'timeSent'];
  dataSource = new MatTableDataSource<Enquiry>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEnquiries();
  }

  fetchEnquiries(): void {
    const url = `${environment.baseUrl}api/messages/getmessage`;
    this.http.get<Enquiry[]>(url).subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Failed to fetch enquiries', err);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(enquiry: Enquiry): void {
    console.log('Row clicked:', enquiry);
    // Add navigation or modal logic here
  }
}
