import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guestbook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.css']
})
export class GuestbookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
