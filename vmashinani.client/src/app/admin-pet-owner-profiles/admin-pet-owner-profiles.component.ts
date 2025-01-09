import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from './../../environments/environment';

export interface PetOwner {
  id: number;
  name: string;
  jobTitle: string;
  location: string;
  email: string;
}

@Component({
  selector: 'app-admin-pet-owner-profiles',
  standalone: false,
  templateUrl: './admin-pet-owner-profiles.component.html',
  styleUrls: ['./admin-pet-owner-profiles.component.scss']
})
export class AdminPetOwnerProfilesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'jobTitle', 'location', 'email'];
  dataSource = new MatTableDataSource<PetOwner>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPetOwners();
  }

  fetchPetOwners(): void {
    const url = `${environment.baseUrl}api/petowner/getpetowner`;
    this.http.get<PetOwner[]>(url).subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Failed to Pet Owners', err);
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

  onRowClick(petOwner: PetOwner): void {
    console.log('Row clicked:', petOwner);
    // Add navigation or modal logic here
  }
}
