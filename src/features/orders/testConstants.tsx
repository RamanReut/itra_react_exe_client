import { types } from './reducer'

export const COLUMNS = new Map<types.Columns, string>([
    ['order_id', 'Order ID'],
    ['customer_name', 'Customer'],
    ['manager_name', 'Manager'],
]);

export const VISIBLE: Array<types.Columns> = ['order_id'];

export const DATA: types.DataIndexable = {};
DATA[1] = {
    order_id: 1,
    order_status: 1,
    order_date: '2018-10-23',
    required_date: '2018-10-25',
    shipped_date: '2018-10-28',
    manager_name: 'Senior Manager',
    customer_name: 'Empire Customer',
    email: 'asdfg@email.org',
    address: 'Some, Great, Address',
    order_items: [
        {
            product: 'Usual Product',
            brand: 'Great Brand',
            model_year: 2012,
            quantity: 5,
            list_price: 545,
            discount: 0.07,
        }
    ],
};
DATA[5] = {
    order_id: 5,
    order_status: 3,
    order_date: '2019-1-30',
    required_date: '2019-2-2',
    shipped_date: '2019-2-15',
    manager_name: 'Another Manager',
    customer_name: 'First Customer',
    email: 'useful@email.com',
    address: 'Secondary, Important, Addr',
    order_items: [
        {
            product: 'Great Product',
            brand: 'Missing Brand',
            model_year: 2015,
            quantity: 10,
            list_price: 299.99,
            discount: 0.2,
        }, {
            product: 'Standart Product',
            brand: 'Normal Brand',
            model_year: 2016,
            quantity: 8,
            list_price: 99,
            discount: 0.05,
        },
    ],
};
