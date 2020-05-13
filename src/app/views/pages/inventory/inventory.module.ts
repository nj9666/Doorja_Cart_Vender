import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { InventoryComponent,stockDialog } from './inventory.component';



@NgModule({
  declarations: [InventoryComponent,stockDialog],
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
			  component: InventoryComponent,
      },
      
    ]),
  ],
  entryComponents: [InventoryComponent,stockDialog]
})
export class InventoryModule { }
