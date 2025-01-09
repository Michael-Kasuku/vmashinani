import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from './../../environments/environment';

export interface Admin {
  id: number;
  name: string;
  jobTitle: string;
  location: string;
  email: string;
}
@Component({
  selector: 'app-admin-admin-profiles',
  standalone: false,
  templateUrl: './admin-admin-profiles.component.html',
  styleUrl: './admin-admin-profiles.component.scss'
})
export class AdminAdminProfilesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'jobTitle', 'location', 'email'];
  dataSource = new MatTableDataSource<Admin>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPetOwners();
  }

  fetchPetOwners(): void {
    const url = `${environment.baseUrl}api/admin/getadmin`;
    this.http.get<Admin[]>(url).subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Failed to Administrators', err);
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

  onRowClick(admin: Admin): void {
    console.log('Row clicked:', admin);
    // Add navigation or modal logic here
  }
}
