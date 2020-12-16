import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';
import { PriceComponent } from './price/price.component';
import { InfoComponent } from './info/info.component';
import { DetailTableComponent } from './detail-components/detail-table/detail-table.component';
import { DetailSearchComponent } from './detail-components/detail-search/detail-search.component';
import { GalleryComponent } from './detail-components/gallery/gallery.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { RoomboxComponent } from './detail-components/roombox/roombox.component';
import { PromotionsComponent } from './detail-components/promotions/promotions.component';

@NgModule({
  declarations: [
    PriceComponent, 
    InfoComponent,  
    DetailTableComponent,
    DetailSearchComponent,
    GalleryComponent,
    RoomboxComponent,
    PromotionsComponent,
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    MaterialModule,
    CommonsModule,
    NgxGalleryModule
  ]
})
export class DetailsModule { }
