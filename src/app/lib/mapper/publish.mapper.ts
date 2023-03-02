import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { BlocksEntity, IArticleMapper, IPublicationHighlights, PublishNotes, Tag } from "@lib/interfaces/post.interface";
import { Guid } from "@lib/utils/guid.util";

@Injectable({
  providedIn: 'root',
})
export class PublishMapper {
  user_id!: string;
  constructor(public auth: AuthService){
    auth.getIdTokenClaims().subscribe((res) => {
      const user_id = (res?.['sub'] as string).split('|')[1];
      this.user_id = user_id;
    })
  }

  public async postPublicationMapper(post: IPublicationHighlights, imgUrl: string, tags: Tag[], form?: any): Promise<IArticleMapper> {
    return {
      id: Guid.newGuid(),
      username: this.user_id,
      header: form.previewTitle,
      content: form.previewSubTitle,
      tag: tags,
      imgUrl: imgUrl
    }
  }

  public async getPublicationHighlights(post: PublishNotes): Promise<IPublicationHighlights> {
    const content =  await this.getContentFromPublication(post.blocks);
    return {
      author: post.author? post.author : '',
      header: await this.getHeaderFromPublication(post.blocks),
      content: content,
      imgUrl: await this.getImageFromPublication(post.blocks)
    };
  }

  private getHeaderFromPublication(blocks: BlocksEntity[]): Promise<string> {
    return new Promise((resolve) => {
      if(blocks) {
        blocks.forEach((element) => {
          if(element?.type == 'header') {
            const head = element.data.text? element.data.text : '';
            resolve(head)
          }
        })
      }
      resolve('')
    });
  }

  private getContentFromPublication(blocks: BlocksEntity[]): Promise<string> {
    return new Promise((resolve) => {
      if(blocks) {
        blocks.forEach((element) => {
          if(element.type == 'paragraph') {
            const head = element.data.text? element.data.text : '';
            resolve(new DOMParser().parseFromString(head, 'text/html').body.innerText)
          }
        })
      }
      resolve('');
    })
  }

  private getImageFromPublication(blocks: BlocksEntity[]): Promise<string[]> {
    const imageUrls = [''];
    let counter = 0
    return new Promise((resolve) => {
      if(blocks) {
        for (let index = 0; index < blocks.length; index++) {
          const element = blocks[index];
          if(element.type === 'image' && element.data.file) {
            imageUrls[counter] = element.data.file?.url;
            counter+=1;
          }
        }
        resolve(imageUrls)
      }
      resolve([])
    })
  }

  private mapUserList(json: PublishNotes[]): Promise<IPublicationHighlights>[] {
    if (json) return json.map(this.getPublicationHighlights);
    return [];
  }
}
