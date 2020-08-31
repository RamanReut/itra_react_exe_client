import { RootSelector } from '../../../share/reduxTools'
import * as types from './types'

export class OrdersSelector extends RootSelector<types.RootState> {
    private get orders(): types.OrdersState {
        return this._state.orders
    }

    protected get detail(): types.DetailState {
        return this.orders.detail;
    }

    protected get ordersTable(): types.OrdersTableState {
        return this.orders.ordersTable;
    }
}
