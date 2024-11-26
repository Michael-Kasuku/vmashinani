import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VetLoginComponent } from './vet-login/vet-login.component';
import { PetOwnerLoginComponent } from './pet-owner-login/pet-owner-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminMyProfileComponent } from './admin-my-profile/admin-my-profile.component';
import { AdminVetProfilesComponent } from './admin-vet-profiles/admin-vet-profiles.component';
import { AdminPetOwnerProfilesComponent } from './admin-pet-owner-profiles/admin-pet-owner-profiles.component';
import { AdminAppointmentsComponent } from './admin-appointments/admin-appointments.component';
import { VetSignupComponent } from './vet-signup/vet-signup.component';
import { VetForgotPasswordComponent } from './vet-forgot-password/vet-forgot-password.component';
import { VetDashboardComponent } from './vet-dashboard/vet-dashboard.component';
import { VetMyProfileComponent } from './vet-my-profile/vet-my-profile.component';
import { VetVetProfilesComponent } from './vet-vet-profiles/vet-vet-profiles.component';
import { VetPetOwnerProfilesComponent } from './vet-pet-owner-profiles/vet-pet-owner-profiles.component';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { PetOwnerSignupComponent } from './pet-owner-signup/pet-owner-signup.component';
import { PetOwnerForgotPasswordComponent } from './pet-owner-forgot-password/pet-owner-forgot-password.component';
import { PetOwnerMyProfileComponent } from './pet-owner-my-profile/pet-owner-my-profile.component';
import { PetOwnerVetProfilesComponent } from './pet-owner-vet-profiles/pet-owner-vet-profiles.component';
import { PetOwnerPetOwnerProfilesComponent } from './pet-owner-pet-owner-profiles/pet-owner-pet-owner-profiles.component';
import { PetOwnerAppointmentsComponent } from './pet-owner-appointments/pet-owner-appointments.component';
import { AdminEnquiriesComponent } from './admin-enquiries/admin-enquiries.component';
import { PetOwnerDashboardComponent } from './pet-owner-dashboard/pet-owner-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'our-services', component: ServicesComponent },
  { path: 'our-team', component: TeamComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-signup', component: AdminSignupComponent },
  { path: 'admin-forgot', component: AdminForgotPasswordComponent },
  { path: 'admin-enquiries', component: AdminEnquiriesComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-my-profile', component: AdminMyProfileComponent },
  { path: 'admin-vet-profiles', component: AdminVetProfilesComponent },
  { path: 'admin-pet-owner-profiles', component: AdminPetOwnerProfilesComponent },
  { path: 'admin-appointments', component: AdminAppointmentsComponent },
  { path: 'vet-login', component: VetLoginComponent },
  { path: 'vet-signup', component: VetSignupComponent },
  { path: 'vet-forgot', component: VetForgotPasswordComponent },
  { path: 'vet-dashboard', component: VetDashboardComponent },
  { path: 'vet-my-profile', component: VetMyProfileComponent },
  { path: 'vet-vet-profiles', component: VetVetProfilesComponent },
  { path: 'vet-pet-owner-profiles', component: VetPetOwnerProfilesComponent },
  { path: 'vet-appointments', component: VetAppointmentsComponent },
  { path: 'pet-owner-login', component: PetOwnerLoginComponent },
  { path: 'pet-owner-signup', component: PetOwnerSignupComponent },
  { path: 'pet-owner-forgot', component: PetOwnerForgotPasswordComponent },
  { path: 'pet-owner-dashboard', component: PetOwnerDashboardComponent },
  { path: 'pet-owner-my-profile', component: PetOwnerMyProfileComponent },
  { path: 'pet-owner-vet-profiles', component: PetOwnerVetProfilesComponent },
  { path: 'pet-owner-pet-owner-profiles', component: PetOwnerPetOwnerProfilesComponent },
  { path: 'pet-owner-appointments', component: PetOwnerAppointmentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import RouterModule with configured routes
  exports: [RouterModule], // Export RouterModule so it's available throughout the app
})
export class AppRoutingModule { }
