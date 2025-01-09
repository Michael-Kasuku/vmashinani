import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatService } from './chat.service';
import { PetOwnerProfile } from '../vet-pet-owner-profiles/vet-pet-owner-profiles.component';

interface ChatMessage {
  sender: string | null;
  receiver: string | null;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-vet-chat',
  standalone: false,
  templateUrl: './vet-chat.component.html',
  styleUrl: './vet-chat.component.scss'
})
export class VetChatComponent implements OnInit, OnDestroy {
  currentUserEmail: string | null = localStorage.getItem('email');
  selectedPetOwner!: PetOwnerProfile;
  messages: { [key: string]: ChatMessage[] } = {}; // Categorized by date
  newMessage: string = '';
  private connection: signalR.HubConnection | null = null;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const petProfileJson = localStorage.getItem('pet');
    if (petProfileJson) {
      this.selectedPetOwner = JSON.parse(petProfileJson);
      this.fetchMessages();
      this.startSignalRConnection();
    } else {
      this.openSnackbar('No Pet Owner or Sender Email available!', 'error');
      this.router.navigate(['/vet-dashboard']);
    }
  }

  fetchMessages(): void {
    if (this.currentUserEmail && this.selectedPetOwner.email) {
      this.chatService.getMessages(this.currentUserEmail, this.selectedPetOwner.email).subscribe(
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
        this.router.navigate(['/vet-dashboard']);
      });

    this.connection.on('ReceiveMessage', (senderEmail: string, message: string) => {
      if (senderEmail === this.selectedPetOwner.email) {
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
        receiver: this.selectedPetOwner.email,
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

  // Added method to expose keys of the messages object
  getObjectKeys(obj: { [key: string]: any }): string[] {
    return Object.keys(obj);
  }
}
