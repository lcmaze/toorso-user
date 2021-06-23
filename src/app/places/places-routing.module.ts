import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacedetailsComponent } from './placedetails/placedetails.component';

import { PlacesComponent } from './places.component';

const routes: Routes = [
  { path: '', component: PlacesComponent },
  { path: 'placedetails', component: PlacedetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
