import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { PaymantComponent } from './paymant.component';
import { OverviewComponent } from './overview/overview.component';
import { PreviousComponent } from './previous/previous.component';



@NgModule({
  declarations: [PaymantComponent, OverviewComponent, PreviousComponent],
  imports: [
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
			  component: PaymantComponent,
        children: [
          {
            path: 'overview',
            component: OverviewComponent
          },
          {
            path: 'previous',
            component: PreviousComponent
          },
          
        ]
      },
      
    ]),
  ]
})
export class PaymantModule { }