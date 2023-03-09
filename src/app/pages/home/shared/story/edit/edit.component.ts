import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { IPublicationHighlights, PublishNotes, Tag } from '@lib/interfaces';
import { PublishMapper } from '@lib/mapper/publish.mapper';
import { CreatepostService } from '@lib/services/firebase/createpost.service';
import { PosterComponent } from '../poster/poster.component';

import { ContenteditableValueAccessor } from '@lib/directives/cvcontent.directive';
import { ShortenStringPipe } from '@lib/pipes/ShortenPipe.pipe';


@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ContenteditableValueAccessor,
      multi: true
    }
  ]
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
    @Inject(DIALOG_DATA) public data: { outputData: PublishNotes; header: string; },
    public postMapper: PublishMapper,
    public bareDialog: Dialog,
    private fb: FormBuilder,
    public postserv: CreatepostService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.postMapper.getPublicationHighlights(this.data.outputData).then((res) => {
      if (res) {
        if (this.data.outputData) {
          this.PublicationForm.get('previewTitle')?.setValue(this.data.header);
        }

        if (res.content) {
          this.PublicationForm.get('previewSubTitle')?.setValue(new ShortenStringPipe().transform(res.content));
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
      this.data.outputData.highlight = res;
      // this.postserv.addPosts(this.data)
      this.postserv.postToRTDatabase(this.data.outputData, res.id).then((res) => {
        if(res == 200) {
          this.dialogRef.close();
          this.router.navigateByUrl('/archives/stories/posts')
        }
      })
    });
  }

  public openImgDrawer(): void {
    const dialogRef = this.bareDialog.open<string>(PosterComponent, {
      width: 'w-auto',
      maxWidth: 'unset',
      panelClass: [
        'my-outlined-dialog',
        'no-scrollbar',
        'overflow-container',
        'rounded-none',
        'md:h-[60vh]',
        'h-full'
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
