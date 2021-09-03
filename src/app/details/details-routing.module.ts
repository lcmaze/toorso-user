import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FailureComponent } from './failure/failure.component';

import { InfoComponent } from './info/info.component';
import { PaymentComponent } from './payment/payment.component';
import { PriceComponent } from './price/price.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: ':slug', component: PriceComponent },
  { path: 'price', component: PriceComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'failure', component: FailureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
