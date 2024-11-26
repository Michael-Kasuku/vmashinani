import { Component, OnInit } from '@angular/core';

interface ServiceItem {
  title: string;
  description: string;
  delay: number;
}

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: ServiceItem[] = [
    {
      title: 'Vet Directory',
      description: 'Easily discover certified veterinarians in your vicinity and schedule appointments with ease and assurance.',
      delay: 100,
    },
    {
      title: 'Agrovet Hub',
      description: 'Browse a comprehensive selection of high-quality veterinary products and essential animal care items, all available at competitive prices.',
      delay: 200,
    },
    {
      title: 'Community Forum',
      description: 'Engage with a dynamic network of veterinary professionals and pet owners, fostering knowledge-sharing and collaboration.',
      delay: 300,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
