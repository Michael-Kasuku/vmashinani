import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminAuthInterceptor } from './admin-auth/admin-auth.interceptor';
import { VetAuthInterceptor } from './vet-auth/vet-auth.interceptor';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // MatOption is included in MatSelectModule, but explicit imports are sometimes needed
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';


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
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { PetOwnerSignupComponent } from './pet-owner-signup/pet-owner-signup.component';
import { PetOwnerForgotPasswordComponent } from './pet-owner-forgot-password/pet-owner-forgot-password.component';
import { PetOwnerMyProfileComponent } from './pet-owner-my-profile/pet-owner-my-profile.component';
import { PetOwnerVetProfilesComponent } from './pet-owner-vet-profiles/pet-owner-vet-profiles.component';
import { PetOwnerAppointmentsComponent } from './pet-owner-appointments/pet-owner-appointments.component';
import { PetOwnerDashboardComponent } from './pet-owner-dashboard/pet-owner-dashboard.component';
import { AdminEnquiriesComponent } from './admin-enquiries/admin-enquiries.component';
import { AdminAdminProfilesComponent } from './admin-admin-profiles/admin-admin-profiles.component';
import { ChatComponent } from './chat/chat.component';
import { VetChatComponent } from './vet-chat/vet-chat.component';
import { VetPetOwnerProfilesComponent } from './vet-pet-owner-profiles/vet-pet-owner-profiles.component';

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
    VetAppointmentsComponent,
    PetOwnerSignupComponent,
    PetOwnerForgotPasswordComponent,
    PetOwnerMyProfileComponent,
    PetOwnerVetProfilesComponent,
    PetOwnerAppointmentsComponent,
    PetOwnerDashboardComponent,
    AdminEnquiriesComponent,
    AdminAdminProfilesComponent,
    ChatComponent,
    VetChatComponent,
    VetPetOwnerProfilesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
    MatRadioModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: VetAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
