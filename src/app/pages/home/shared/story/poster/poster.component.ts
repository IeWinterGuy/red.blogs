import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '@lib/material/material.module';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {
  defaultImg = '';
  constructor(public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: {selected: string, imgList: string[]}) { }

  ngOnInit(): void {
    this.defaultImg = this.data.selected;
  }

  public setPosterForArticle(event: unknown, index: number) {
    this.defaultImg = this.data.imgList[index];
  }

  public dialogClose() {
    this.dialogRef.close(this.defaultImg);
  }
}
