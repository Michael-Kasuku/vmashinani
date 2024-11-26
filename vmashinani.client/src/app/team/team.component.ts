import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Josphine Otieno',
      position: 'Chief Executive Officer',
      description:
        'As the Chief Executive Officer of Vet Mashinani, Josphine Otieno is responsible for setting and executing the strategic vision of the company. Her leadership ensures the alignment of company objectives with long-term business goals, fostering a culture of innovation, collaboration, and operational excellence.',
      image: '/img/team/josphine.png',
    },
    {
      name: 'Michael Kasuku',
      position: 'Chief Operations Officer',
      description:
        'Michael Kasuku serves as the Chief Operations Officer at Vet Mashinani, overseeing and optimizing the company’s daily operations. With a strong focus on efficiency and effectiveness, Michael ensures that operational strategies are seamlessly implemented, driving high performance and quality service delivery.',
      image: '/img/team/kasuku.png',
    },
    {
      name: 'Daisy Lopez',
      position: 'Chief Technology Officer',
      description:
        'As the Chief Technology Officer, Daisy Lopez leads Vet Mashinani’s technological advancements, ensuring that the company remains at the forefront of industry trends. With a keen focus on digital transformation, Daisy drives innovation that enhances both operational efficiency and customer experience.',
      image: '/img/team/lopez.png',
    },
  ];
}
