import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone:false,
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  terms = [
    {
      title: 'Acceptance of Terms',
      text: 'By accessing or using Vet Mashinani, you agree to follow our Terms of Service. If you disagree with any of the terms outlined, we kindly ask you not to use our platform.'
    },
    {
      title: 'Eligibility to Use',
      text: 'Vet Mashinani is intended for individuals aged 18 and above. Users under 18 may access the platform only with parental or guardian consent.'
    },
    {
      title: 'Account Responsibility',
      text: 'Keep your account details secure, as all activities under your account are your responsibility. Ensure compliance with Kenyan laws and these terms.'
    },
    {
      title: 'Booking Veterinary Services',
      text: 'Vet Mashinani connects you with trusted veterinarians for service bookings. Note that service availability is subject to each veterinarian\'s schedule and resources.'
    },
    {
      title: 'Payments and Refunds',
      text: 'Our platform facilitates payments securely. Should you have questions about transactions or refunds, feel free to contact us. Refunds may apply in specific circumstances.'
    },
    {
      title: 'Limitations of Liability',
      text: 'While we work to provide reliable connections, Vet Mashinani is not liable for outcomes or services rendered by veterinarians. Use our platform responsibly and provide feedback to improve your experience.'
    },
    {
      title: 'Privacy and Data Protection',
      text: 'Your privacy is essential to us. Refer to our Privacy Policy for details on data use and protection. By using our services, you consent to our data practices as per Kenyan regulations.'
    },
    {
      title: 'Updating Terms',
      text: 'We may update these terms occasionally to enhance our services. Notifications of changes will be provided, and continued use signifies acceptance.'
    },
    {
      title: 'Governing Law',
      text: 'These terms are governed by Kenyan laws. Any disputes arising from the interpretation of these terms shall be resolved within the Kenyan legal framework.'
    }
  ];
}
