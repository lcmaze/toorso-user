import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoComponent } from './info/info.component';
import { PriceComponent } from './price/price.component';

const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'price', component: PriceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
