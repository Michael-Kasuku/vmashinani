import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Material animations
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAccordion } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

// Components
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VetLoginComponent,
    PetOwnerLoginComponent,
    AdminLoginComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    ContactComponent,
    FaqsComponent,
    AdminSignupComponent,
    AdminForgotPasswordComponent,
    AdminDashboardComponent,
    AdminMyProfileComponent,
    AdminVetProfilesComponent,
    AdminPetOwnerProfilesComponent,
    AdminAppointmentsComponent,
    VetSignupComponent,
    VetForgotPasswordComponent,
    VetDashboardComponent,
    VetMyProfileComponent,
    VetVetProfilesComponent,
    VetPetOwnerProfilesComponent,
    VetAppointmentsComponent,
    PetOwnerSignupComponent,
    PetOwnerForgotPasswordComponent,
    PetOwnerMyProfileComponent,
    PetOwnerVetProfilesComponent,
    PetOwnerPetOwnerProfilesComponent,
    PetOwnerAppointmentsComponent,
    AdminEnquiriesComponent,
    PetOwnerDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Enable Angular Material animations
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatAccordion,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
