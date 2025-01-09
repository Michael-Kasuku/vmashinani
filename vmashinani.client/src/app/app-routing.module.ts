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
import { AdminAdminProfilesComponent } from './admin-admin-profiles/admin-admin-profiles.component';
import { AdminVetProfilesComponent } from './admin-vet-profiles/admin-vet-profiles.component';
import { AdminPetOwnerProfilesComponent } from './admin-pet-owner-profiles/admin-pet-owner-profiles.component';
import { AdminAppointmentsComponent } from './admin-appointments/admin-appointments.component';
import { VetSignupComponent } from './vet-signup/vet-signup.component';
import { VetForgotPasswordComponent } from './vet-forgot-password/vet-forgot-password.component';
import { VetDashboardComponent } from './vet-dashboard/vet-dashboard.component';
import { VetMyProfileComponent } from './vet-my-profile/vet-my-profile.component';
import { VetPetOwnerProfilesComponent } from './vet-pet-owner-profiles/vet-pet-owner-profiles.component';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { PetOwnerSignupComponent } from './pet-owner-signup/pet-owner-signup.component';
import { PetOwnerForgotPasswordComponent } from './pet-owner-forgot-password/pet-owner-forgot-password.component';
import { PetOwnerMyProfileComponent } from './pet-owner-my-profile/pet-owner-my-profile.component';
import { PetOwnerVetProfilesComponent } from './pet-owner-vet-profiles/pet-owner-vet-profiles.component';
import { PetOwnerAppointmentsComponent } from './pet-owner-appointments/pet-owner-appointments.component';
import { PetOwnerDashboardComponent } from './pet-owner-dashboard/pet-owner-dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { VetChatComponent } from './vet-chat/vet-chat.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminAuthGuard } from './admin-auth/admin-auth.guard';
import { VetAuthGuard } from './vet-auth/vet-auth.guard';

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
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin-my-profile', component: AdminMyProfileComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin-admin-profiles', component: AdminAdminProfilesComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin-vet-profiles', component: AdminVetProfilesComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin-pet-owner-profiles', component: AdminPetOwnerProfilesComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin-appointments', component: AdminAppointmentsComponent, canActivate: [AdminAuthGuard] },
  { path: 'vet-login', component: VetLoginComponent },
  { path: 'vet-signup', component: VetSignupComponent },
  { path: 'vet-forgot', component: VetForgotPasswordComponent },
  { path: 'vet-dashboard', component: VetDashboardComponent, canActivate: [VetAuthGuard] },
  { path: 'vet-my-profile', component: VetMyProfileComponent, canActivate: [VetAuthGuard] },
  { path: 'vet-pet-owner-profiles', component: VetPetOwnerProfilesComponent, canActivate: [VetAuthGuard] },
  { path: 'vet-appointments', component: VetAppointmentsComponent, canActivate: [VetAuthGuard] },
  { path: 'pet-owner-login', component: PetOwnerLoginComponent },
  { path: 'pet-owner-signup', component: PetOwnerSignupComponent },
  { path: 'pet-owner-forgot', component: PetOwnerForgotPasswordComponent },
  { path: 'pet-owner-dashboard', component: PetOwnerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'pet-owner-my-profile', component: PetOwnerMyProfileComponent, canActivate: [AuthGuard] },
  { path: 'pet-owner-vet-profiles', component: PetOwnerVetProfilesComponent, canActivate: [AuthGuard] },
  { path: 'pet-owner-appointments', component: PetOwnerAppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'vet-chat', component: VetChatComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import RouterModule with configured routes
  exports: [RouterModule], // Export RouterModule so it's available throughout the app
})
export class AppRoutingModule { }
