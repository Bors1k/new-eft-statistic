import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { DashboardComponent } from './components/auth/dashboard/dashboard.component';
import { ViryfEmailComponent } from './components/auth/viryf-email/viryf-email.component';
import { BodyHitsComponent } from './components/body-hits/body-hits.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BulletsTableComponent } from './components/body-hits/bullets-table/bullets-table.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule  } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ViryfEmailComponent,
    BodyHitsComponent,
    ForgotPasswordComponent,
    BulletsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ProgressbarModule.forRoot(),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
