import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

import { AppComponent } from './app/app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { JwtInterceptor, ServerErrorInterceptor } from './app/lib/interceptors';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp({ ...environment.firebaseConfig })),
      provideFirestore(() => getFirestore()),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AuthModule.forRoot({
        ...environment.auth,
        httpInterceptor: {
          ...environment.httpInterceptor,
        },
      }), BrowserAnimationsModule,
    ),
    importProvidersFrom(RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
}).catch((error) => console.error(error));
