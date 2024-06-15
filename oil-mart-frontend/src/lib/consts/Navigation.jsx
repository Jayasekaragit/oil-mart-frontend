import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'inventory',
		label: 'Inventory',
		path: '/admin/inventory',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/admin/transactions',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'add_new_product',
		label: 'Add New Product',
		path: '/admin/add_new_product',
		icon: <HiOutlineCube />
	},

	{
		key: 'new_stock',
		label: 'Add New Supply',
		path: '/admin/new_stock',
		icon: <HiOutlineCube />
	},
	{	
		key: 'changeProducts',
		label: 'Change Products',
		path: '/admin/changeProducts',
		icon: <HiOutlineShoppingCart />
	},
	// {
	// 	key: 'customers',
	// 	label: 'Customers',
	// 	path: '/customers',
	// 	icon: <HiOutlineUsers />
	// },
	
	{
		key: 'notifications',
		label: 'Notifications',
		path: '/admin/notifications',
		icon: <HiOutlineAnnotation />
	},
	{
		key: 'suppliers',
		label: 'Suppliers',
		path: '/admin/suppliers',
		icon: <HiOutlineAnnotation />
	},
	{
		key: 'users',
		label: 'Manage Users',
		path: '/admin/users',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'logout',
		label: 'Logout',
		path: '/logout',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]