import { 
    RootState, 
    NavbarState, 
    LayoutState, 
    NavbarPosition,
    HeaderState,
} from './types'
import { RootSelector } from '../../../share/reduxTools'

export class LayoutSelector extends RootSelector<RootState> { 
    protected get root(): LayoutState {
        return this._state.layout;
    }

    protected get navbar(): NavbarState {
        return this.root.navbar;
    }

    protected get header(): HeaderState {
        return this.root.header;
    } 

    public get navbarPosition(): NavbarPosition {
        return this.navbar.position;
    }
}