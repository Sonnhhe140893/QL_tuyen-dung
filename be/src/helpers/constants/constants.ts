import { IHttpStatus } from "../helper";

export const HTTP_STATUS: IHttpStatus = {
	error: 'error',
	success: 'success',
	fail: 'fail',
};

export const USER_CONST: any = {
	USER_STATUS_ACTIVE: 1,
	USER_STATUS_LOCK: -1,
	USER_ADM: 1,
	USER_PUB: 2
};

export const STATUS_ORDER: any = {
	PENDING: 1,
	PRE_APPROVED: 2,
	REJECTED: -1,
	APPROVED: 3 // done
};

export const GROUP_TYPE: any = [
	{
		'value': 'SUPER_ADMIN',
		'label': 'Full quyền'
	},
	{
		'value': 'ROLE',
		'label': 'Role'
	},
	{
		'value': 'PERMISSION',
		'label': 'Permission'
	},
	{
		'value': 'USER',
		'label': 'User'
	},
	{
		'value': 'ORDER',
		'label': 'Order'
	},
	{
		'value': 'PRODUCT',
		'label': 'Product'
	},
	{
		'value': 'CATEGORY',
		'label': 'Category'
	}
];


export const PERMISSION_ROUTE = [
	// category
	{ route: 'category/status', permission: 'CATEGORY_UPDATE' },
	{ route: 'category/delete/:id', permission: 'CATEGORY_DELETE' },
	{ route: 'category/show/:id', permission: 'CATEGORY_SHOW' },
	{ route: 'category/edit/:id', permission: 'CATEGORY_UPDATE' },
	{ route: 'category/create', permission: 'CATEGORY_CREATE' },
	{ route: 'category/list', permission: 'CATEGORY_INDEX' },

	// product
	{ route: 'product/status', permission: 'PRODUCT_UPDATE' },
	{ route: 'product/delete/:id', permission: 'PRODUCT_DELETE' },
	{ route: 'product/show/:id', permission: 'PRODUCT_SHOW' },
	{ route: 'product/edit/:id', permission: 'PRODUCT_UPDATE' },
	{ route: 'product/create', permission: 'PRODUCT_CREATE' },
	{ route: 'product/list', permission: 'PRODUCT_INDEX' },

	// product
	{ route: 'user/status', permission: 'USER_UPDATE' },
	{ route: 'user/delete/:id', permission: 'USER_DELETE' },
	{ route: 'user/show/:id', permission: 'USER_SHOW' },
	{ route: 'user/edit/:id', permission: 'USER_UPDATE' },
	{ route: 'user/create', permission: 'USER_CREATE' },
	{ route: 'user/list', permission: 'USER_INDEX' },
	// permissions
	{ route: 'permission/list', permission: 'PERMISSION_INDEX' },
	// roles
	{ route: 'role', permission: 'ROLE_INDEX' },
	{ route: 'role/:id', permission: 'ROLE_SHOW' },
	{ route: 'role/create', permission: 'ROLE_CREATE' },
	{ route: 'role/edit/:id', permission: 'ROLE_UPDATE' },
	{ route: 'role/delete/:id', permission: 'ROLE_DELETE' },
];


export const regexGmail = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g;
export const regexEmail = /[a-z][a-z0-9_\.]{0,31}[a-z0-9]{0,}@[a-z0-9\-]{2,}(\.[a-z0-9\-]{2,}){1,4}/g
export const regexPass = /[a-zA-Z0-9]{6,20}/g;
export const regexUserName = /([a-zA-Z0-9]){6,20}/g;
export const regexPhone = /([0-9]{9,10}\b)/g; //(09|03|07|08|05|04|\+84|84)+

export const CATEGORY_TYPE = [
	{
		id: 1,
		name: 'Experience'
	},
	{
		id: 2,
		name: 'Role'
	},
	{
		id: 3,
		name: 'Form of work'
	},
	{
		id: 4,
		name: 'Salary'
	},
];

export const USER_TYPE = [
	{
		id: 'ADMIN',
		name: 'Admin'
	},
	{
		id: 'EMPLOYER',
		name: 'Nhà tuyển dụng'
	},
	{
		id: 'USER',
		name: 'Người ứng tuyển'
	}
]