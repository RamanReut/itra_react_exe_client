export interface OrdersState {
    ordersTable: OrdersTableState;
    detail: DetailState;
    visibleColumns: ColumnVisibleState;
    timeline: TimelineState;
}

export interface OrdersTableState {
    data: DataIndexable;
    visibleColumns: Array<Columns>;
    isControlColumnsOpen: boolean;
    isLoading: boolean;
    isLoadingFailed: boolean;
    checkedColumns: Array<Columns>;
}

export interface DataIndexable {
    [index: number]: Record;
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

export type MapColumnToColumnName = {
    [column in Columns]: string;
}

export interface ColumnVisibleState {
    isOpen: boolean;
    checkedColumns: Array<Columns>;
}

export interface MapNumberToString {
    [index: number]: string;
}

export interface TimelineState {
    activeStep: number;
}
