import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    public dialogRef: DialogRef<ProfileComponent>){}


  public dialogClose(): void {
    this.dialogRef.close();
  }
}
