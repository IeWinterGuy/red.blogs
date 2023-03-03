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
import { environment } from '@env/environment';
import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { MaterialModule } from '@lib/material/material.module';
import { CreatepostService } from '@lib/services/firebase/createpost.service';
import { ArticleComponent } from './article/article.component';
import { EditComponent } from './edit/edit.component';
import { EditorComponent } from './editor/editor.component';
import { PosterComponent } from './poster/poster.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ArticlesComponent } from './webshell.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    EditComponent,
    EditorComponent,
    PosterComponent,
    ViewerComponent,
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
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forChild([
      {
        path: '',
        component: ArticlesComponent,
        data: {
          title: 'blog',
          description:
            'Angular starter for enterprise-grade front-end projects, built under a clean architecture that helps to scale and maintain a fast workflow.',
          robots: 'index, follow',
        },
        children: [],
      },
    ]),
  ],
  providers: [
    CreatepostService,

  ],
})
export class StoryModule {}
