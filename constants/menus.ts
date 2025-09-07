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
import salesIcon from '~/components/icons/sales.vue';
import cvIcon from '~/components/icons/cv.vue';

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
					{ name: 'Reports', url: '/home/reports', isOpen: false, },
					{ name: 'Analytics', url: '/home/analytics', isOpen: false, },
				],
			},
		],
	},
	{
		name: 'Master Data',
		key: 'master-data',
		icon: markRaw(domainIcon),
		roles: ['admin', 'superadmin'],
		child: [
			{
				name: 'Databases',
				icon: markRaw(domainIcon),
				url: '/master-data/categories',				
			}
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
                url: '/users/user-lists',
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
			{
				name:'POS Theme',
				icon: markRaw(salesIcon),
				url: '/theme/pos-theme',
			},
			{
				name:'CV Theme',
				icon: markRaw(cvIcon),
				url: '/theme/cv-theme',
			}
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
	{
		name: 'Auth View',
		key: 'auth-view',
		icon: markRaw(lockIcon),
		child: [
			{
				name: 'Auth Login UI 1',
				icon: markRaw(lockIcon),
				url: '/auth/login',
				isBlank: true,
			},
		],
	},
];
