import { 
    createSlice, 
    combineReducers,
    Action,
} from '@reduxjs/toolkit'
import { NavbarPosition } from './Navbar'
import { RootSelector } from '../../share/reduxTools'

const BASIC_REDUCER_NAME = 'layout';

interface LayoutState {
    navbar: NavbarState;
}

interface NavbarState {
    position: NavbarPosition;
}

const navbarInitialState: NavbarState = {
    position: 'open',
}

const navbarSlice = createSlice({
    name: `${BASIC_REDUCER_NAME}/navbar`,
    initialState: navbarInitialState,
    reducers: {
        togglePosition(state: NavbarState, action: Action): void {
            state.position = state.position === 'open' ? 'hide' : 'open';
        }
    },
});

export interface RootState {
    layout: LayoutState,
}

class LayoutSelector extends RootSelector<RootState> { 
    protected get root(): LayoutState {
        return this._state.layout;
    }

    protected get navbar(): NavbarState {
        return this.root.navbar;
    }

    public get navbarPosition(): NavbarPosition {
        return this.navbar.position;
    }
}

export class HeaderSelector extends LayoutSelector {}

export const reducer = combineReducers({
    navbar: navbarSlice.reducer,
});

export const actions = {
    navbar: {
        ...navbarSlice.actions,
    }
}