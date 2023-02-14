import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArticleMapper, PublishNotes } from '@lib/interfaces';
import { ArticleMapper } from '@lib/mapper/article.mapper';

@Component({
  selector: 'post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  userNotesAndArticlesInfo: PublishNotes;
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
    this.router.navigate(['/publication/publish'], { queryParams: { page: id}});
  }
}
