// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SharedModule } from '../../Shared/shared.module';
import { SystemService } from '../../Shared/SystemService';

@NgModule({
	declarations: [],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatInputModule,
		MatFormFieldModule,
		SharedModule.forRoot()
	],
	providers: [
		SystemService,
	]
})
export class PagesModule {
}
