export interface Menus {
	name: string;
	key: string;
	icon: any;
	roles?: string[];
	child: {
		name: string;
		url: string;
		icon?: any;
		children?: ChildMenus[];
	}[];
}

export interface ChildMenus {
	name: string;
	url: string;
	isOpen?: boolean;
	isBlank?: boolean;
}
