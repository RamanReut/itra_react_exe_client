import { OrdersSelector } from './rootSelector'
import * as types from './types'

export class OrdersTableSelector extends OrdersSelector {
    public get visibleColumns(): Array<types.Columns> {
        return this.ordersTable.visibleColumns;
    }

    public get data(): Array<types.Record> {
        return this.ordersTable.data;
    }

    public get isControlColumnsOpen(): boolean {
        return this.ordersTable.isControlColumnsOpen;
    }

    public get isLoading(): boolean {
        return this.ordersTable.isLoading;
    }
}
