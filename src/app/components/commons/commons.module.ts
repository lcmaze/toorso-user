import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { CategoryboxComponent } from './categorybox/categorybox.component';
import { GuestmodalComponent } from './guestmodal/guestmodal.component';
import { CounterComponent } from './counter/counter.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PercentageComponent } from './percentage/percentage.component';
import { CommentsComponent } from './comments/comments.component';
import { WritereviewComponent } from './writereview/writereview.component';
import { RatingcounterComponent } from './ratingcounter/ratingcounter.component';

@NgModule({
  declarations: [
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
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    GuestmodalComponent,
    ForgotComponent,
    RegisterComponent,
    LoginComponent,
    WritereviewComponent
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
    RatingcounterComponent
  ]
})
export class CommonsModule { }
