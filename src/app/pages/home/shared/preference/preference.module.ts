import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@lib/material/material.module';
import { InfoComponent } from './info/info.component';
import { NotificationComponent } from './notification/notification.component';
import { PreferenceComponent } from './preference.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    ProfileComponent,
    InfoComponent,
    NotificationComponent,
    PreferenceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,

    RouterModule.forChild([
      {
        path: '',
        component: PreferenceComponent,
        data: {
          title: 'blog',
          description:
            'Angular starter for enterprise-grade front-end projects, built under a clean architecture that helps to scale and maintain a fast workflow.',
          robots: 'index, follow',
        },
        children: []
      }
    ]),
  ]
})
export class PreferenceModule { }
