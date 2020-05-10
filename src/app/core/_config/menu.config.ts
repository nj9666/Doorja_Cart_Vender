export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Product',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'Listing',
							bullet: 'dot',
							icon: 'flaticon-business',
							page: '/product/listing',
						},
						{
							title: 'Add New',
							bullet: 'dot',
							icon: 'flaticon-business',
							page: '/product/addnew',
						},
					]
				},
				{
					title: 'inventory',
					root: true,
					alignment: 'left',
					page: '/inventory',
				},
				{
					title: 'order',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'Listing',
							bullet: 'dot',
							icon: 'flaticon-business',
							page: '/order/orders',
						},
						{
							title: 'Add New',
							bullet: 'dot',
							icon: 'flaticon-business',
							page: '/order/returns',
						},
					]
				},
				{
					title: 'paymant',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'Listing',
							bullet: 'dot',
							icon: 'flaticon-business',
							page: '/paymant/overview',
						},
						{
							title: 'Add New',
							bullet: 'dot',
							icon: 'flaticon-business',
							page: '/paymant/previous',
						},
					]
				},
				{
					title: 'growth',
					root: true,
					alignment: 'left',
					page: '/growth',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
