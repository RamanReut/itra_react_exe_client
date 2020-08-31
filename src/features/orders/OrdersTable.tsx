import React, { useMemo, useEffect, useCallback } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { types } from './reducer'
import Box from '@material-ui/core/Box'
import ControlColumnVisibility from './ControlColumnVisibility'
import OrderDetail from './OrderDetail'

export const columnsLocalizations = new Map<types.Columns, string>([
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

export interface DataTableProps {
    data: types.DataIndexable;
    visibleColumns: Array<types.Columns>;
    onFetch: () => void;
    onToggleVisibility: (id: string) => void;
    isDetailOpen: boolean;
    detailId: number;
    onDetailOpen: (id: number) => void;
    onDetailClose: () => void;
    tab: number;
    onChangeTab: (id: number) => void;
}

export default function OrdersTable({
    data,
    visibleColumns,
    onFetch,
    onToggleVisibility,
    isDetailOpen,
    detailId,
    onDetailOpen,
    onDetailClose,
    tab,
    onChangeTab,
}: DataTableProps ) {
    const columns = useMemo(() => createColumnsList(visibleColumns), [visibleColumns]);
    const dataExistable = useMemo(() => createExistableData(data), [data]);

    const handleRowClick = useCallback((_, { order_id }) => {
       onDetailOpen(order_id as number);
    }, [onDetailOpen]);

    useEffect(() => {
        onFetch();
    }, [onFetch])

    return (
        <Box>
            <MaterialTable
                columns={columns}
                data={dataExistable}
                components={{
                    Toolbar: props => (
                        <Box>
                            <MTableToolbar {...props}></MTableToolbar>
                            <ControlColumnVisibility 
                                columns={columnsLocalizations}
                                visible={visibleColumns}
                                onClick={onToggleVisibility}
                            ></ControlColumnVisibility>
                        </Box>
                    )
                }}
                options={{
                    pageSize: 15,
                    pageSizeOptions: [10, 15, 20, 25, 30],
                    filtering: true,
                    search: false,
                }}
                title='Data'
                onRowClick={handleRowClick}
            ></MaterialTable>
            <OrderDetail
                isOpen={isDetailOpen}
                id={detailId}
                data={data}
                onClose={onDetailClose}
                tab={tab}
                onChangeTab={onChangeTab}
            ></OrderDetail>
        </Box>
    );
}

interface Column {
    field: string,
    title: string,
}

function createColumnsList(columns: Array<types.Columns>): Array<Column>{
    return columns.map((column) => {
        return {
            field: column,
            title: columnsLocalizations.get(column) || '',

        }
    });
}

function createExistableData(data: types.DataIndexable): Array<types.Row> {
    let res: Array<types.Row> = [];
    for(let i in data) {
        let { order_items, ...rest} = {...data[i]}
        res.push(rest);         //material-table require extensible elements
    }
    return res;
}
