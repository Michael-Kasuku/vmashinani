import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone:false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  handleSubmit(event: Event) {
    event.preventDefault();

    if (
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.subject ||
      !this.formData.message
    ) {
      this.openSnackbar('All fields are required.', 'error');
      return;
    }

    this.http
      .post('https://localhost:40443/api/messages', {
        Name: this.formData.name,
        SenderEmailAddress: this.formData.email,
        Subject: this.formData.subject,
        MessageContent: this.formData.message,
      })
      .subscribe(
        () => {
          this.openSnackbar('Message sent successfully!', 'success');
          this.resetForm();
        },
        () => {
          this.openSnackbar('Error sending message. Please try again.', 'error');
        }
      );
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
