import { LayoutSelector } from './LayoutSelector'

export class HeaderSelector extends LayoutSelector {    
    public get searchText(): string {
        return this.header.searchText;
    }
}