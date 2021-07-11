import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent, ResetDialogComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { CategoryboxComponent } from './categorybox/categorybox.component';
import { GuestmodalComponent } from './guestmodal/guestmodal.component';
import { CounterComponent } from './counter/counter.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PercentageComponent } from './percentage/percentage.component';
import { CommentsComponent } from './comments/comments.component';
import { WritereviewComponent } from './writereview/writereview.component';
import { RatingcounterComponent } from './ratingcounter/ratingcounter.component';
import { LoadinScreenComponent } from './loadin-screen/loadin-screen.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ResetDialogComponent,
    SearchComponent,
    SearchboxComponent,
    CategoryboxComponent,
    GuestmodalComponent,
    CounterComponent,
    FooterComponent,
    ForgotComponent,
    RegisterComponent,
    LoginComponent,
    PercentageComponent,
    CommentsComponent,
    WritereviewComponent,
    RatingcounterComponent,
    LoadinScreenComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    GuestmodalComponent,
    ForgotComponent,
    RegisterComponent,
    LoginComponent,
    WritereviewComponent,
    ResetDialogComponent
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    SearchboxComponent,
    CategoryboxComponent,
    GuestmodalComponent,
    CounterComponent,
    FooterComponent,
    ForgotComponent,
    RegisterComponent,
    LoginComponent,
    PercentageComponent,
    CommentsComponent,
    WritereviewComponent,
    RatingcounterComponent,
    LoadinScreenComponent
  ]
})
export class CommonsModule { }
