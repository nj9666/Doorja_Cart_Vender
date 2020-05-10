import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ListingComponent } from './listing/listing.component';
import { AddnewComponent } from './addnew/addnew.component';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ListingComponent, AddnewComponent, ProductComponent],
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
			  component: ProductComponent,
        children: [
          {
            path: 'listing',
            component: ListingComponent
          },
          {
            path: 'addnew',
            component: AddnewComponent
          },
          
        ]
      },
      
    ]),
  ]
})
export class ProductModule { }
