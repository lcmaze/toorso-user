import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { InfoComponent } from './info/info.component';
import { DetailsComponent } from './details/details.component';
import { CommonsModule } from '../components/commons/commons.module';


@NgModule({
  declarations: [InfoComponent, DetailsComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    CommonsModule
  ]
})
export class BookingsModule { }
