// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule) },

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'product',
				loadChildren: () => import('app/views/pages/product/product.module').then(m => m.ProductModule)
			},
			{
				path: 'order',
				loadChildren: () => import('app/views/pages/order/order.module').then(m => m.OrderModule)
			},
			{
				path: 'paymant',
				loadChildren: () => import('app/views/pages/paymant/paymant.module').then(m => m.PaymantModule)
			},
			{
				path: 'inventory',
				loadChildren: () => import('app/views/pages/inventory/inventory.module').then(m => m.InventoryModule)
			},
			{
				path: 'growth',
				loadChildren: () => import('app/views/pages/growth/growth.module').then(m => m.GrowthModule)
			},
			{
				path: 'profile',
				loadChildren: () => import('app/views/pages/profile/profile.module').then(m => m.ProfileModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
		]
	},

	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
