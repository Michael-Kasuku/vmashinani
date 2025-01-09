import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatService } from './chat.service';
import { VetProfile } from '../pet-owner-vet-profiles/pet-owner-vet-profiles.component';

interface ChatMessage {
  sender: string | null;
  receiver: string | null;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  currentUserEmail: string | null = localStorage.getItem('email');
  selectedVet!: VetProfile;
  messages: { [key: string]: ChatMessage[] } = {}; // Categorized by date
  newMessage: string = '';
  private connection: signalR.HubConnection | null = null;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const vetProfileJson = localStorage.getItem('vet');
    if (vetProfileJson) {
      this.selectedVet = JSON.parse(vetProfileJson);
      this.fetchMessages();
      this.startSignalRConnection();
    } else {
      this.openSnackbar('No Vet or Sender Email available!', 'error');
      this.router.navigate(['/pet-owner-dashboard']);
    }
  }

  get objectKeys() {
    return Object.keys;
  }

  fetchMessages(): void {
    if (this.currentUserEmail && this.selectedVet.email) {
      this.chatService.getMessages(this.currentUserEmail, this.selectedVet.email).subscribe(
        (data: ChatMessage[]) => {
          this.messages = this.categorizeMessagesByDate(data);
        },
        (error) => {
          console.error('Error fetching messages:', error);
          this.openSnackbar('Failed to load chat history.', 'error');
        }
      );
    }
  }

  categorizeMessagesByDate(messages: ChatMessage[]): { [key: string]: ChatMessage[] } {
    return messages.reduce((acc, message) => {
      const date = new Date(message.timestamp).toDateString();
      acc[date] = acc[date] || [];
      acc[date].push(message);
      return acc;
    }, {} as { [key: string]: ChatMessage[] });
  }

  startSignalRConnection(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:40443/chathub', { withCredentials: true })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection
      .start()
      .catch((err) => {
        this.openSnackbar('Unable to connect to chat. Redirecting...', 'error');
        this.router.navigate(['/pet-owner-dashboard']);
      });

    this.connection.on('ReceiveMessage', (senderEmail: string, message: string) => {
      if (senderEmail === this.selectedVet.email) {
        const newMessage: ChatMessage = {
          sender: senderEmail,
          receiver: this.currentUserEmail,
          content: message,
          timestamp: new Date(),
        };
        const date = new Date().toDateString();
        this.messages[date] = this.messages[date] || [];
        this.messages[date].push(newMessage);
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.connection) {
      const message: ChatMessage = {
        sender: this.currentUserEmail,
        receiver: this.selectedVet.email,
        content: this.newMessage,
        timestamp: new Date(),
      };
      const date = new Date().toDateString();
      this.messages[date] = this.messages[date] || [];
      this.messages[date].push(message);

      this.connection
        .invoke('SendMessage', message.sender, message.receiver, message.content, message.timestamp)
        .catch((err) => {
          console.error('SignalR SendMessage Error:', err);
          this.openSnackbar('Failed to send message. Please try again.', 'error');
        });

      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.connection?.stop();
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: snackBarClass });
  }
}
