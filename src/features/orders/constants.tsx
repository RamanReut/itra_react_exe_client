import { types } from './reducer'
import { MapNumberToString } from './reducer/types';

export const MAP_STATUS_ID_TO_TEXT: MapNumberToString = {
    1: 'Pending',
    2: 'Processing',
    3: 'Rejected',
    4: 'Completed',
};

export const COLUMNS_LOCALIZATIONS: types.MapColumnToColumnName = {
    'order_id':        'Order ID',
    'order_status':    'Order status',
    'order_date':      'Order date',
    'required_date':   'Required date',
    'shipped_date':    'Shipped date',
    'manager_name':    'Manager name',
    'customer_name':   'Customer name',
    'email':           'Email',
    'address':         'Address',
};

