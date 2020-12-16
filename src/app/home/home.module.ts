import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';
import { OwlModule } from 'ngx-owl-carousel';
import { CategoryCardComponent } from './category-card/category-card.component';
import { PlacecardComponent } from './placecard/placecard.component';


@NgModule({
  declarations: [HomeComponent, CategoryCardComponent, PlacecardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    CommonsModule,
    OwlModule
  ]
})
export class HomeModule { }
