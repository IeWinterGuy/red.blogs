import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublishNotes } from '@lib/interfaces';
import { CreatepostService } from '@lib/services/firebase/createpost.service';
import { PostComponent } from './post/post.component';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public articles: PublishNotes[] = [];
  constructor(public router: Router, public postServ: CreatepostService) {
    //..
  }

  ngOnInit(): void {
    this.postServ.getArticlesFromFirebase().then((res) => {
      this.articles = res;
      console.log(this.articles)
    })
  }

}
