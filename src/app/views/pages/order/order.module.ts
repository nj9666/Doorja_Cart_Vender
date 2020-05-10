import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { OrderComponent } from './order.component';
import { OrdersComponent } from './orders/orders.component';
import { ReturnsComponent } from './returns/returns.component';



@NgModule({
  declarations: [OrderComponent, OrdersComponent, ReturnsComponent],
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
			  component: OrderComponent,
        children: [
          {
            path: 'orders',
            component: OrdersComponent
          },
          {
            path: 'returns',
            component: ReturnsComponent
          },
          
        ]
      },
      
    ]),
  ]
})
export class OrderModule { }

