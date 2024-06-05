interface NavigationItem {
    title: string,
    url: string,
    justify: 'center' | 'end',
    showOnAuth?: boolean,
}

interface NavigatorStrategy {
    getNavigationItems: (pathname: string, isAuth: boolean) => NavigationItem[],
}

export type {
    NavigationItem,
    NavigatorStrategy,
}