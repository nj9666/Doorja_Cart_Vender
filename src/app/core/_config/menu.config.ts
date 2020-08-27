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
					icon: 'fa fa-boxes',
					toggle: 'click',
					submenu: [
						{
							title: 'Listing',
							bullet: 'dot',
							icon: 'flaticon-list-3',
							page: '/product/listing',
						},
						{
							title: 'Add New',
							bullet: 'dot',
							icon: 'la la-plus',
							page: '/product/addnew',
						},
					]
				},
				{
					title: 'inventory',
					root: true,
					alignment: 'left',
					icon: 'flaticon2-open-box',
					page: '/inventory',
				},
				{
					title: 'order',
					root: true,
					alignment: 'left',
					icon: 'la la-shopping-cart',
					toggle: 'click',
					submenu: [
						{
							title: 'Orders',
							bullet: 'dot',
							icon: 'la la-cart-arrow-down',
							page: '/order/orders',
						},
						{
							title: 'Returns',
							bullet: 'dot',
							icon: 'la la-sign-in',
							page: '/order/returns',
						},
					]
				},
				{
					title: 'paymant',
					root: true,
					alignment: 'left',
					icon: 'la la-money',
					toggle: 'click',
					submenu: [
						{
							title: 'Overview',
							bullet: 'dot',
							icon: 'la la-eye',
							page: '/paymant/overview',
						},
						{
							title: 'Previous Paymants',
							bullet: 'dot',
							icon: 'la la-list-ol',
							page: '/paymant/previous',
						},
					]
				},
				{
					title: 'growth',
					root: true,
					alignment: 'left',
					icon: 'flaticon2-graphic',
					page: '/growth',
				},
				{
					title: 'Profile',
					root: true,
					alignment: 'right',
					icon: 'flaticon2-user',
					page: '/profile',
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
