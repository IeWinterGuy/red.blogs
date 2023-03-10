import { Dialog } from '@angular/cdk/dialog';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ProfileComponent } from './profile/profile.component';

@Component({
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, public bareDialog: Dialog) { }

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }

  openProfileEditDialog() {
    const dialogRef = this.bareDialog.open<string>(ProfileComponent, {
      panelClass: [
        'bg-white',
        'my-outlined-dialog',
        'no-scrollbar',
        'overflow-container',
        'rounded'
      ],
      data: {},
      disableClose: true,
    });

    dialogRef.closed.subscribe((value) => {

    });
  }

}
