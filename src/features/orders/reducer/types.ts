export interface OrdersState {
    ordersTable: OrdersTableState;
    detail: DetailState;
}

export interface OrdersTableState {
    data: Array<Record>;
    visibleColumns: Array<Columns>;
    isControlColumnsOpen: boolean;
    isLoading: boolean;
}

export interface DetailState {
    isOpen: boolean;
    id: number;
    tab: number;
}

export interface Record extends Row {
    order_items: Array<OrderItem>;
}

export interface OrderItem {
    product: string;
    brand: string;
    model_year: number;
    quantity: number;
    list_price: number;
    discount: number;
}

export interface Row {
    order_id: number;
    order_status: number;
    order_date: string;
    required_date: string;
    shipped_date: string;
    manager_name: string;
    customer_name: string;
    email: string;
    address: string;
}

export type Columns = 
    'order_id'      |
    'order_status'  |
    'order_date'    |
    'required_date' |
    'shipped_date'  |
    'manager_name'  |
    'customer_name' |
    'email'         |
    'address'       ;   

export interface RootState {
    orders: OrdersState;
}
