import { types } from './reducer'

export const COLUMNS = new Map<types.Columns, string>([
    ['order_id', 'Order ID'],
    ['customer_name', 'Customer'],
    ['manager_name', 'Manager'],
]);

export const VISIBLE: Array<types.Columns> = ['order_id'];
