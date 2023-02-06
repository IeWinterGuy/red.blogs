import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor() {
    //..
  }

  ngOnInit(): void {

  }

}
