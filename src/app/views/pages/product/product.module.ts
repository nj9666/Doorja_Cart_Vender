import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ListingComponent } from './listing/listing.component';
import { AddnewComponent,SizeDialog,colourDialog } from './addnew/addnew.component';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ListingComponent, AddnewComponent, ProductComponent,SizeDialog,colourDialog],
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
          {
            path: 'addnew/:id',
            component: AddnewComponent
          },
          
        ]
      },
      
    ]),
  ],
  entryComponents: [
    SizeDialog,colourDialog,
  ]
})
export class ProductModule { }
