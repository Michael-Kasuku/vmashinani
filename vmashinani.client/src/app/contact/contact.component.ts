import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone:false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  formData = {
    Name: '',
    Email: '',
    Subject: '',
    Content: '',
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  handleSubmit(event: Event) {
    event.preventDefault();

    if (
      !this.formData.Name ||
      !this.formData.Email ||
      !this.formData.Subject ||
      !this.formData.Content
    ) {
      this.openSnackbar('All fields are required.', 'error');
      return;
    }
    const url = `${environment.baseUrl}api/messages/createmessage`;
    this.http
      .post(url, {
        Name: this.formData.Name,
        Email: this.formData.Email,
        Subject: this.formData.Subject,
        Content: this.formData.Content,
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
      Name: '',
      Email: '',
      Subject: '',
      Content: '',
    };
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
