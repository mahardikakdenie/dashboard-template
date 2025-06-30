import IconReport from '../components/icons/report.vue';
import IconDashboard from '../components/icons/dashboard.vue';
import iconHome from '../components/icons/home.vue';
import IconProduct from '../components/icons/product.vue';
import IconOrder from '../components/icons/order.vue';
import theme from '../components/icons/theme.vue';
import starIcon from '../components/icons/star.vue';
import packagesIcon from '../components/icons/packages.vue';
import domainIcon from '../components/icons/domain.vue';
import purchaseIcon from '../components/icons/purchase.vue';
import truckIcon from '../components/icons/truck.vue';
import shoppingIcon from '../components/icons/shopping.vue';
import storeIcon from '../components/icons/store.vue';
import uxCircleIcon from '../components/icons/ux-circle.vue';
import alertIcon from '../components/icons/alert.vue';
import usersIcon from '../components/icons/users.vue';
import lockIcon from '../components/icons/lock.vue';

export const MenuSidebar = [
	{
		name: 'Dashboard',
		key: 'index',
		icon: markRaw(iconHome),
		roles: ['admin', 'superadmin'],
		child: [
			{ name: 'Dashboard', icon: markRaw(IconDashboard), url: '/' },
			{ name: 'Companies', icon: markRaw(theme), url: '/home/companies' },
			{
				name: 'Subcriptions',
				icon: markRaw(starIcon),
				url: '/home/subcription',
			},
			{
				name: 'Packages',
				icon: markRaw(packagesIcon),
				url: '/home/packages',
			},
			{ name: 'Domain', icon: markRaw(domainIcon), url: '/home/domain' },
			{
				name: 'Purchase Transaction',
				icon: markRaw(purchaseIcon),
				url: '/home/purchase-transaction',
			},
			{
				name: 'Overview',
				url: '',
				icon: markRaw(packagesIcon),
				children: [
					{ name: 'Reports', url: '/dashboard/reports' },
					{ name: 'Analytics', url: '/dashboard/analytics' },
				],
			},
		],
	},
    {
        name: 'Users',
        key: 'users',
        icon: markRaw(usersIcon),
        roles: [],
        child: [
            {
                name: 'Users List',
                icon: markRaw(usersIcon),
                url: '/users/lists',
            },
            {
                name: 'Roles',
                icon: markRaw(lockIcon),
                url: '/users/roles',
            }
        ],
    },
	{
		name: 'Orders',
		key: 'orders',
		icon: markRaw(IconOrder),
		child: [
			{
				name: 'Order Monitoring',
				icon: markRaw(truckIcon),
				url: '/order/order-monitong-monitoring',
			},
		],
	},
	{
		name: 'Products',
		key: 'products',
		icon: markRaw(IconProduct),
		child: [
			{
				name: 'List Products',
				icon: markRaw(shoppingIcon),
				url: '/products/product-list',
			},
		],
	},
	{
		name: 'Reports',
		key: 'reports',
		icon: markRaw(IconReport),
		child: [],
	},
	{
		name: 'Theme',
		key: 'theme',
		icon: markRaw(theme),
		child: [
			{
				name: 'Theme Monitoring',
				icon: markRaw(storeIcon),
				url: '/theme/theme-monitoring',
			},
		],
	},
	{
		name: 'UI Interface',
		key: 'ux-interface',
		icon: markRaw(uxCircleIcon),
		child: [
			{
				name: 'Alert UI',
				icon: markRaw(alertIcon),
				url: '/user-interface/alert',
			},
		],
	},
];
