import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { environment } from '@env/environment';
import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { ContenteditableValueAccessor } from '@lib/directives/cvcontent.directive';
import { TruncateTextDirective } from '@lib/directives/truncate-text.directive';
import { MaterialModule } from '@lib/material/material.module';
import { ShortenStringPipe } from '@lib/pipes/ShortenPipe.pipe';
import { CreatepostService } from '@lib/services/firebase/createpost.service';
import { ArticleComponent, ContainerComponent } from './article/article.component';
import { EditComponent } from './edit/edit.component';
import { EditorComponent } from './editor/editor.component';
import { PosterComponent } from './poster/poster.component';
import { ShellComponent } from './shell.component';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    ShellComponent,
    ArticleComponent,
    ContainerComponent,
    EditComponent,
    EditorComponent,
    PosterComponent,
    ViewerComponent,

    ContenteditableValueAccessor,
    TruncateTextDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp({ ...environment.firebaseConfig })),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(() => getFirestore()),
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        data: {
          title: 'blog',
          description:
            'Angular starter for enterprise-grade front-end projects, built under a clean architecture that helps to scale and maintain a fast workflow.',
          robots: 'index, follow',
        },
        children: [
          {
            path: '',
            component: ContainerComponent
          },
          {
            path: 'posts',
            component: ContainerComponent
          },
          {
            path: 'publish',
            component: EditorComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'view',
            component: ViewerComponent
          }
        ]
      }
    ]),
  ],
  providers: [
    CreatepostService,
    ShortenStringPipe
  ],
  bootstrap: [ShellComponent]
})
export class StoryModule {}
