import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { IPublicationHighlights, PublishNotes, Tag } from '@lib/interfaces';
import { PublishMapper } from '@lib/mapper/publish.mapper';
import { CreatepostService } from '@lib/services/firebase/createpost.service';
import { PosterComponent } from '../poster/poster.component';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public publicationHighlights!: IPublicationHighlights;
  public posterImg!: string;
  public PublicationForm = this.fb.group({
    previewTitle: [''],
    previewSubTitle: [''],
    publicationTag: [''],
  });

  public editPublication = {
    title: '',
    subtitle: '',
    imageUrls: [''],
  };
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public tags: Tag[] = [];

  constructor(
    public dialogRef: DialogRef<EditComponent>,
    @Inject(DIALOG_DATA) public data: PublishNotes,
    public postMapper: PublishMapper,
    public bareDialog: Dialog,
    private fb: FormBuilder,
    public postserv: CreatepostService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.postMapper.getPublicationHighlights(this.data).then((res) => {
      if (res) {
        if (res.header) {
          this.PublicationForm.get('previewTitle')?.setValue(res.header);
        }

        if (res.content) {
          this.PublicationForm.get('previewSubTitle')?.setValue(res.content);
        }
      }

      this.posterImg = res.imgUrl ? res.imgUrl[0] : '';
      this.publicationHighlights = res;
    });
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push({ name: value });
    }
    event.chipInput?.clear();
  }

  public remove(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public publishArticle() {
    this.postMapper.postPublicationMapper(this.publicationHighlights, this.posterImg, this.tags, this.PublicationForm.value).then((res) => {
      this.data.highlight = res;
      // this.postserv.addPosts(this.data)
      this.postserv.postToRTDatabase(this.data, res.id).then((res) => {
        if(res == 200) {
          this.dialogRef.close();
          this.router.navigateByUrl('/article')
        }
      })
    });
  }

  public openImgDrawer(): void {
    const dialogRef = this.bareDialog.open<string>(PosterComponent, {
      width: 'auto',
      height: '60vh',
      maxHeight: '400px',
      maxWidth: 'unset',
      panelClass: [
        'my-outlined-dialog',
        'no-scrollbar',
        'overflow-container',
        'rounded-none',
      ],
      data: {
        selected: this.posterImg,
        imgList: this.publicationHighlights.imgUrl,
      },
      disableClose: true,
    });

    dialogRef.closed.subscribe((value) => {
      this.posterImg = value ? value : '';
    });
  }

  public dialogClose(): void {
    this.dialogRef.close();
  }
}
