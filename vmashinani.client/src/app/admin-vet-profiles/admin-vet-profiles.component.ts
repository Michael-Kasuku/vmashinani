import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from './../../environments/environment';

export interface Vet {
  id: number;
  name: string;
  jobTitle: string;
  location: string;
  email: string;
}

@Component({
  selector: 'app-admin-vet-profiles',
  standalone: false,
  templateUrl: './admin-vet-profiles.component.html',
  styleUrls: ['./admin-vet-profiles.component.scss']
})
export class AdminVetProfilesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'jobTitle', 'location', 'email'];
  dataSource = new MatTableDataSource<Vet>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchVets();
  }

  fetchVets(): void {
    const url = `${environment.baseUrl}api/vet/getvet`;
    this.http.get<Vet[]>(url).subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Failed to vets', err);
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

  onRowClick(vet: Vet): void {
    console.log('Row clicked:', vet);
    // Add navigation or modal logic here
  }
}
