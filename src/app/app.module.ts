import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatListModule, MatOptionModule, MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FormsModule} from '@angular/forms';
import {NoteService} from '../services/note.service';
import {ConfirmDialog} from '../dialog/dialog.component';
import {AuthService} from '../services/auth.service';
import {MessagingService} from '../services/messaging.service';

const fireBaseConfig:any = {
  apiKey: "AIzaSyBMc_mBexopca4Qlhzbyij-nzCKFRZNyjU",
  authDomain: "pwa-angular-5c8d1.firebaseapp.com",
  databaseURL: "https://pwa-angular-5c8d1.firebaseio.com",
  projectId: "pwa-angular-5c8d1",
  storageBucket: "",
  messagingSenderId: "136698721303"
};


@NgModule({
  declarations: [
    AppComponent, ConfirmDialog
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule

  ],
  providers: [
    NoteService, AuthService, MessagingService
  ],
  entryComponents: [ConfirmDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
