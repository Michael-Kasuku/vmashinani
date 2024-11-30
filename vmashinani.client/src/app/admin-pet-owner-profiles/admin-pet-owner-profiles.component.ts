import { Component } from '@angular/core';

// Define the interface for the analytics card objects
interface AnalyticsCard {
  title: string;
  value: number | string;  // Value can be a number or a string (for example, gender distribution might be a string)
}

@Component({
  selector: 'app-admin-pet-owner-profiles',
  standalone: false,
  templateUrl: './admin-pet-owner-profiles.component.html',
  styleUrls: ['./admin-pet-owner-profiles.component.scss']
})
export class AdminPetOwnerProfilesComponent {
  PetOwnerProfiles = [
    { id: 1, name: 'Josphine Otieno', location: 'Kisumu', gender: 'female' },
    { id: 2, name: 'Michael Kasuku', location: 'Kakamega', gender: 'male' },
    { id: 3, name: 'Daisy Lopez', location: 'Kisumu', gender: 'female' },
    { id: 3, name: 'Donatus Njoroge', location: 'Kiambu', gender: 'male' }
  ];

  topLocation: string = '';
  genderDistribution = { male: 0, female: 0 };

  // Explicitly define the type of analyticsCards
  analyticsCards: AnalyticsCard[] = [];

  constructor() {
    this.calculateAnalytics();
  }

  calculateAnalytics() {
    const locationCount: Record<string, number> = this.PetOwnerProfiles.reduce((acc, pet_owner) => {
      acc[pet_owner.location] = (acc[pet_owner.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);  // Adding type assertion here

    this.topLocation = Object.keys(locationCount).reduce((a, b) => locationCount[a] > locationCount[b] ? a : b);

    const maleCount = this.PetOwnerProfiles.filter(pet_owner => pet_owner.gender === 'male').length;
    const femaleCount = this.PetOwnerProfiles.filter(pet_owner => pet_owner.gender === 'female').length;
    this.genderDistribution = { male: maleCount, female: femaleCount };


    this.analyticsCards = [
      { title: 'Total Pet Owners', value: this.PetOwnerProfiles.length },
      { title: 'Top Location', value: this.topLocation },
      { title: 'Gender Distribution', value: `Male: ${maleCount} | Female: ${femaleCount}` },
    ];
  }
}
