import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-red',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
