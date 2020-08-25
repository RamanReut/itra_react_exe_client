import { OrdersSelector } from './rootSelector'
import * as types from './types';

export class DetailSelector extends OrdersSelector {
    public get isOpen(): boolean {
        return this.detail.isOpen;
    }

    public get id(): number {
        return this.detail.id;
    }

    public get expandedGroups(): Array<types.DetailGroup> {
        return this.detail.expandedGroups;
    }

    public get expandedProduct(): Array<string> {
        return this.detail.expandedProduct;
    }
}