import { types } from './reducer'

export const COLUMNS_LOCALIZATIONS = new Map<types.Columns, string>([
    ['order_id',        'Order ID'],
    ['order_status',    'Order status'],
    ['order_date',      'Order date'],
    ['required_date',   'Required date'],
    ['shipped_date',    'Shipped date'],
    ['manager_name',    'Manager name'],
    ['customer_name',   'Customer name'],
    ['email',           'Email'],
    ['address',         'Address'],
]);
