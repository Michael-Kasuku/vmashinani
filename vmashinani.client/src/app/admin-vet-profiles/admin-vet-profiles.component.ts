import { Component } from '@angular/core';

// Define the interface for the analytics card objects
interface AnalyticsCard {
  title: string;
  value: number | string;  // Value can be a number or a string (for example, gender distribution might be a string)
}

@Component({
  selector: 'app-admin-vet-profiles',
  standalone: false,
  templateUrl: './admin-vet-profiles.component.html',
  styleUrls: ['./admin-vet-profiles.component.scss']
})
export class AdminVetProfilesComponent {
  vetProfiles = [
    { id: 1, name: 'Dr. Josphine Otieno', specialization: 'Veterinary Surgeon', location: 'Kisumu', gender: 'female' },
    { id: 2, name: 'Dr. Michael Kasuku', specialization: 'Animal Behaviorist', location: 'Nairobi', gender: 'male' },
    { id: 3, name: 'Dr. Daisy Lopez', specialization: 'Animal Behaviorist', location: 'Nairobi', gender: 'female' }
  ];

  topLocation: string = '';
  mostCommonSpecialization: string = '';
  genderDistribution = { male: 0, female: 0 };

  // Explicitly define the type of analyticsCards
  analyticsCards: AnalyticsCard[] = [];

  constructor() {
    this.calculateAnalytics();
  }

  calculateAnalytics() {
    const locationCount: Record<string, number> = this.vetProfiles.reduce((acc, vet) => {
      acc[vet.location] = (acc[vet.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);  // Adding type assertion here

    this.topLocation = Object.keys(locationCount).reduce((a, b) => locationCount[a] > locationCount[b] ? a : b);

    const specializationCount: Record<string, number> = this.vetProfiles.reduce((acc, vet) => {
      acc[vet.specialization] = (acc[vet.specialization] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);  // Adding type assertion here

    this.mostCommonSpecialization = Object.keys(specializationCount).reduce((a, b) => specializationCount[a] > specializationCount[b] ? a : b);

    const maleCount = this.vetProfiles.filter(vet => vet.gender === 'male').length;
    const femaleCount = this.vetProfiles.filter(vet => vet.gender === 'female').length;
    this.genderDistribution = { male: maleCount, female: femaleCount };


    this.analyticsCards = [
      { title: 'Total Vets', value: this.vetProfiles.length },
      { title: 'Top Location', value: this.topLocation },
      { title: 'Common Specialization', value: this.mostCommonSpecialization },
      { title: 'Gender Distribution', value: `Male: ${maleCount} | Female: ${femaleCount}` },
    ];
  }
}
