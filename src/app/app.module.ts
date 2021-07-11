import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainService } from './services/main.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './components/material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { firebaseConfig } from 'src/environments/environment.prod';
import { AuthInterceptor } from './services/auth.interceptor';
import { FirebaseService } from './services/firebase.service';
import { CommonsModule } from './components/commons/commons.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CommonsModule
  ],
  providers: [
    MainService,
    FirebaseService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
