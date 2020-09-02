import React, { useMemo, useEffect } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { types } from './reducer'
import ColumnVisibillity from './ColumnVisibility'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

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

export interface DataTableProps {
    data: Array<types.Row>;
    visibleColumns: Array<types.Columns>;
    onFetch: () => void;
    isControlColumnsOpen: boolean;
    onControlColumnsOpenChange: (state: boolean) => void;
    onVisibilityChange: (visible: Array<types.Columns>) => void;
}

export default function DataTable({
    data,
    visibleColumns,
    onFetch,
    isControlColumnsOpen,
    onControlColumnsOpenChange,
    onVisibilityChange
}: DataTableProps ) {
    const classes = useStyles();

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
