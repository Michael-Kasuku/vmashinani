import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  standalone: false,
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent {
  expandedIndex: number | null = null;

  faqItems = [
    {
      question: "How do I book an appointment with a veterinarian?",
      answer: "Booking is straightforward! Simply log into your Vet Mashinani account, browse certified veterinarians, and select a time that suits you. A confirmation email will be sent immediately.",
    },
    {
      question: "Can I reschedule or cancel an appointment?",
      answer: "Absolutely! Navigate to 'My Appointments' to reschedule or cancel. Please ensure you cancel at least 24 hours in advance to avoid any cancellation fees.",
    },
    {
      question: "How can I track my pet's treatment progress?",
      answer: "Stay informed with real-time updates on your pet's treatment! Log into Vet Mashinani to view your pet's status, which is continuously updated by your veterinarian. You'll also receive notifications via email or SMS.",
    },
    {
      question: "What services do veterinarians offer on Vet Mashinani?",
      answer: "Vet Mashinani provides a comprehensive range of services, including routine check-ups, vaccinations, surgeries, emergency care, nutritional counseling, and behavior consultations. Each veterinarian profile details their specific specialties.",
    },
    {
      question: "How do I choose the right veterinarian for my pet?",
      answer: "Review each profile to understand the veterinarian's qualifications, specialties, and feedback from other pet owners. Don't hesitate to reach out with any questions to ensure you make the best choice for your pet.",
    },
    {
      question: "Is my pet's information kept confidential?",
      answer: "Your privacy is our top priority! All information regarding your pet is securely stored and shared only with authorized personnel involved in their care.",
    },
    {
      question: "What should I do in case of an emergency?",
      answer: "In the event of an emergency, contact the nearest veterinary clinic immediately or use Vet Mashinani to find emergency services in your vicinity.",
    },
    {
      question: "Can I leave a review for a veterinarian?",
      answer: "Yes! After your appointment, we encourage you to leave a review to assist others in finding the right veterinarian and to help us enhance our services.",
    },
    {
      question: "What payment methods are accepted on Vet Mashinani?",
      answer: "We offer various payment options, including credit/debit cards, mobile money, and bank transfers, to facilitate seamless transactions.",
    },
    {
      question: "How can I contact Vet Mashinani for further assistance?",
      answer: "For additional support, please visit our 'Contact Us' page or reach out to our support team via email or phone.",
    },
  ];

  toggleFAQ(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
