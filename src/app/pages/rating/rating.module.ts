import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { RatingComponent } from './rating.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RatingComponent],
  imports: [
    CommonModule,
    SharedModule,
    RatingRoutingModule
  ]
})
export class RatingModule { }
