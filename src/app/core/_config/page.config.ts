export class PageConfig {
	public defaults: any = {
		dashboard: {
			page: {
				title: 'Dashboard',
				desc: 'Latest updates and statistic charts'
			},
		},
		product:{
			listing:{
				page:{title: 'Product Listing',desc:''}
			},
			addnew:{
				page:{title: 'Add new Product',desc:''}
			},
		},
		inventory: {
			page: {
				title: 'Inventory',
				desc: 'Latest updates and statistic charts'
			},
		},
		order:{
			orders:{
				page:{title: 'Orders Listing',desc:''}
			},
			returns:{
				page:{title: 'Returns Product',desc:''}
			},
		},
		paymant:{
			overview:{
				page:{title: 'Paymant Overview',desc:''}
			},
			previous:{
				page:{title: 'Previous Paymants',desc:''}
			},
		},
		growth: {
			page: {
				title: 'Growth',
				desc: 'Latest updates and statistic charts'
			},
		},
		error: {
			404: {
				page: {title: '404 Not Found', desc: '', subheader: false}
			},
			403: {
				page: {title: '403 Access Forbidden', desc: '', subheader: false}
			}
		},
		wizard: {
			'wizard-1': {page: {title: 'Wizard 1', desc: ''}},
			'wizard-2': {page: {title: 'Wizard 2', desc: ''}},
			'wizard-3': {page: {title: 'Wizard 3', desc: ''}},
			'wizard-4': {page: {title: 'Wizard 4', desc: ''}},
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
