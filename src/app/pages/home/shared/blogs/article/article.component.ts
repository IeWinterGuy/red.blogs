import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArticleMapper, PublishNotes } from '@lib/interfaces';
import { ArticleMapper } from '@lib/mapper/article.mapper';

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
