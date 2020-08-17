export interface HeaderState {
    searchText: string,
}

export interface NavbarState {
    position: NavbarPosition;
}

export interface LayoutState {
    navbar: NavbarState;
    header: HeaderState;
}

export interface RootState {
    layout: LayoutState;
}

export type NavbarPosition = 'hide' | 'open'