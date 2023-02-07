import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { ThemeService } from '@lib/services/theme';
import { Observable } from 'rxjs';
import { LayoutHorizontalComponent } from './lib/components/layout/layout.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutHorizontalComponent,
    AngularFireModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(private _authService: AuthService, private _themeService: ThemeService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;

    this._themeService.init();
  }
}
