import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
import { OwlModule } from 'ngx-owl-carousel';
import { CommonsModule } from '../components/commons/commons.module';
import { MaterialModule } from '../components/material/material.module';
import { AsideComponent } from './aside/aside.component';
import { ResultsComponent } from './results/results.component';
import { PlacedetailsComponent } from './placedetails/placedetails.component';


@NgModule({
  declarations: [PlacesComponent, AsideComponent, ResultsComponent, PlacedetailsComponent],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    MaterialModule,
    CommonsModule,
    OwlModule
  ]
})
export class PlacesModule { }
