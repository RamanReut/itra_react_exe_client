import React, { useMemo, useEffect } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { types } from './reducer'
import Box from '@material-ui/core/Box'
import ControlColumnVisibility from './ControlColumnVisibility'

const columnsLocalizations = new Map<types.Columns, string>([
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
    data: Array<types.Row>;
    visibleColumns: Array<types.Columns>;
    onFetch: () => void;
    onToggleVisibility: (id: string) => void;
}

export default function DataTable({
    data,
    visibleColumns,
    onFetch,
    onToggleVisibility,
}: DataTableProps ) {
    const columns = useMemo(() => createColumnsList(visibleColumns), [visibleColumns]);
    const dataExistable = useMemo(() => createExistableData(data), [data]);

    useEffect(() => {
        onFetch();
    }, [onFetch])

    return (
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
        ></MaterialTable>
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

function createExistableData(data: Array<types.Row>) {
    return data.map((elem) => {
        return {...elem};
    });
}