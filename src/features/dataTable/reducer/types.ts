export interface DataTableState {
    data: Array<Row>;
    visibleColumns: Array<Columns>;
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
    dataTable: DataTableState;
}    
