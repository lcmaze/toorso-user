import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterRoutingModule } from './filter-routing.module';
import { FilterComponent } from './filter.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';
import { SelectedfilterComponent } from './selectedfilter/selectedfilter.component';
import { AsideComponent } from './aside/aside.component';
import { ResultsComponent } from './results/results.component';
import { MatInputModule } from '@angular/material';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  declarations: [FilterComponent, SelectedfilterComponent, AsideComponent, ResultsComponent],
  imports: [
    CommonModule,
    FilterRoutingModule,
    MaterialModule,
    CommonsModule,
    MatInputModule,
    Ng5SliderModule,
  ]
})
export class FilterModule { }
