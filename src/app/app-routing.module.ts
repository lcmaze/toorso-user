import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'filter', loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule) },
<<<<<<< HEAD
  { path: 'vendor/:slug', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
  // { path: 'details', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
=======
  { path: 'filter/:link', loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule) },
  { path: 'vendor/:slug', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
  { path: 'vendor-checkout', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
>>>>>>> e1affdaf9c6c6ce10a485392788dd0d246f8a04c
  { path: 'places', loadChildren: () => import('./places/places.module').then(m => m.PlacesModule) },
  { path: 'bookings', loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
