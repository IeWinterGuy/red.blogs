import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-guestbook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.css']
})
export class GuestbookComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
