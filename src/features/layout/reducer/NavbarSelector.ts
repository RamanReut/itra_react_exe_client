import { LayoutSelector } from './LayoutSelector'
import { NavbarPosition } from './types'

export class NavbarSelector extends LayoutSelector {
    public get position(): NavbarPosition {
        return this.navbarPosition;
    }
}