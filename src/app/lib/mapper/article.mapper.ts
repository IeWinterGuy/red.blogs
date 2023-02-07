import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { IArticleMapper, IPublicationHighlights, PublishNotes } from "@lib/interfaces/post.interface";
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ArticleMapper {
  private renderer!: Renderer2;
  constructor(private rendererFactory: RendererFactory2){
    this.renderer = rendererFactory.createRenderer(null, null)
  }

  public async mapPublicationHighlights(post: PublishNotes): Promise<IArticleMapper> {
    return {
      id: post.highlight.id,
      author: post.author? post.author : '',
      header: post.highlight.header,
      content: post.highlight.content,
      time: await this.getPublicationTime(post.time),
      username: post.highlight.username,
      content_length: post.content_length,
      tag: post.highlight.tag,
      imgUrl: post.highlight.imgUrl
    };
  }

  private getPublicationTime(epoch: number): Promise<string> {
    const config = {
      future: "in %s",
      past: "%s ago",
      s: 'a few seconds',
      ss: '%d seconds',
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
   }
    moment.updateLocale('en', {
      relativeTime : config
    });

    return new Promise((resolve) => {
      resolve(moment(epoch).fromNow())
    })
  }

  private mapUserList(json: PublishNotes[]): Promise<IPublicationHighlights>[] {
    if (json) return json.map(this.mapPublicationHighlights);
    return [];
  }
}
