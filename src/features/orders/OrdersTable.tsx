import React, { useMemo, useEffect, useCallback } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { types } from './reducer'
import Box from '@material-ui/core/Box'
import OrderDetail from './OrderDetail'
import ColumnVisibillity from './ColumnVisibility'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { MAP_STATUS_ID_TO_TEXT } from './constants'

const useStyles = makeStyles({
    labelWrapper: {
        minWidth: '5em',
    },
});

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

export interface OrdersTableProps {
    data: types.DataIndexable;
    visibleColumns: Array<types.Columns>;
    onFetch: () => void;
    isControlColumnsOpen: boolean;
    onControlColumnsOpenChange: (state: boolean) => void;
    onVisibilityChange: (visible: Array<types.Columns>) => void;
    isLoading: boolean;   
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
    isControlColumnsOpen,
    onControlColumnsOpenChange,
    onVisibilityChange,
    isLoading,
    isDetailOpen,
    detailId,
    onDetailOpen,
    onDetailClose,
    tab,
    onChangeTab,
}: OrdersTableProps ) {
    const classes = useStyles();

    const columns = useMemo(() => createColumnList(visibleColumns), [visibleColumns]);
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
                isLoading={isLoading}
                columns={columns}
                data={dataExistable}
                components={{
                    Toolbar: props => (
                        <Grid 
                            container
                            alignItems='center'
                        >
                            <Grid 
                                item
                                className={classes.labelWrapper}
                            >
                                <MTableToolbar {...props}></MTableToolbar>
                            </Grid>
                            <Grid item>
                                <ColumnVisibillity
                                    columns={columnsLocalizations}
                                    visible={visibleColumns}
                                    isOpen={isControlColumnsOpen}
                                    onOpenChange={onControlColumnsOpenChange}
                                    onVisibilityChange={onVisibilityChange}
                                ></ColumnVisibillity>
                            </Grid>
                        </Grid>
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
    field: string;
    title: string;
    type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
    lookup?: types.MapNumberToString,
}

function createColumnList(columns: Array<types.Columns>): Array<Column> {
    return modifyColumnList(createColumnLocalizationList(columns));
}

interface modifier {
    (list: Array<Column>): void;
}

const modifiers: Array<modifier> = [
    modifyRequiredDate,
    modifyOrderStatus,
];

function modifyColumnList(columns: Array<Column>): Array<Column> {
    modifiers.forEach((mod) => {
        mod(columns);
    });
    return columns;
}

function modifyRequiredDate(columns: Array<Column>) {
    columns.forEach((elem) => {
        if (elem.field.includes('_date')) {
            elem.type = 'date';
        }
    })
}

function modifyOrderStatus(columns: Array<Column>) {
    columns.forEach((elem) => {
        if (elem.field === 'order_status') {
            elem.lookup = MAP_STATUS_ID_TO_TEXT;
        }
    });
}

function createColumnLocalizationList(columns: Array<types.Columns>): Array<Column>{
    return columns.map((column) => {
        return {
            field: column,
            title: columnsLocalizations.get(column) || '',
        }
    });
}

function createExistableData(data: types.DataIndexable): Array<types.Row> {
    let res = new Array<types.Row>();

    for(let index in data) {
        const { order_items, ...rest } = data[index];
        res.push(rest);
    }
    return res;
}
