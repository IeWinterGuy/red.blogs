import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArticleMapper, PublishNotes } from '@lib/interfaces';
import { ArticleMapper } from '@lib/mapper/article.mapper';
import { CreatepostService } from '@lib/services/firebase/createpost.service';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() userNotesAndArticlesInfo: PublishNotes;
  publicationHighlights!: IArticleMapper

  constructor(public postMapper: ArticleMapper, private router: Router) {
    this.userNotesAndArticlesInfo = <PublishNotes>{};
    this.publicationHighlights = <IArticleMapper>{};
  }

  ngOnInit(): void {
    this.postMapper.mapPublicationHighlights(this.userNotesAndArticlesInfo).then((res) => {
      this.publicationHighlights = res;
    })
  }

  public onBtnActionClicked(id: string) {
    this.router.navigate(['/archives/post'], { queryParams: { page: id}});
  }
}

@Component({
  templateUrl: './container.component.html'
})
export class ContainerComponent implements OnInit {
  public articles: PublishNotes[] = [];
  constructor(public router: Router, public postServ: CreatepostService) {
    //..
  }

  ngOnInit(): void {
    this.postServ.getArticlesFromFirebase().then((res) => {
      this.articles = res;
    })
  }
}
