import { OrdersSelector } from './rootSelector'
import * as types from './types'

export class OrdersTableSelector extends OrdersSelector {
    public get visibleColumns(): Array<types.Columns> {
        return this.ordersTable.visibleColumns;
    }

    public get data(): types.DataIndexable {
        return this.ordersTable.data;
    }
}