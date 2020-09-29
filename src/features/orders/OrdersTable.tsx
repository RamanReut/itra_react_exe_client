import React, { useMemo, useEffect, useCallback } from 'react'
import MaterialTable from 'material-table'
import Box from '@material-ui/core/Box'
import OrderDetail from './OrderDetail'
import { types, actions, selectors } from './reducer'
import { useSelector, useDispatch  } from 'react-redux'
import TableToolbar from './TableToolbar'
import TableBackdrop from './TableBackdrop'
import LoadingError from './LoadingError'
import { createColumnSettingList } from './dataTableColumnSettings'
import { DataIndexable } from './reducer/types'

export default function OrdersTable( ) {
    const dispatch = useDispatch();

    const visibleColumns = useSelector(selectors.ordersTable.visibleColumns);
    const data = useSelector(selectors.ordersTable.data);
    const isLoading = useSelector(selectors.ordersTable.isLoading);
    const isLoaingFailed = useSelector(selectors.ordersTable.isLoadingFailed);

    const columns = useMemo(
        () => createColumnSettingList(visibleColumns), [visibleColumns]);
    const dataExpandable = useMemo(() => createExpandableData(data), [data]);

    
    const handleRowClick = useCallback((_, { order_id }) => {
        dispatch(actions.detail.open(order_id))
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.ordersTable.fetchData());
    }, [dispatch]);

    if(isLoading) {
        return <TableBackdrop></TableBackdrop>;
    }

    if(isLoaingFailed) {
        return <LoadingError></LoadingError>;
    }

    return (
        <Box>
            <MaterialTable
                columns={columns}
                data={dataExpandable}
                components={{
                    Toolbar: props => (<TableToolbar {...props}></TableToolbar>),
                }}
                options={{
                    pageSize: 15,
                    pageSizeOptions: [10, 15, 20, 25, 30],
                    filtering: true,
                    search: false,
                }}              
                onRowClick={handleRowClick}
            ></MaterialTable>
            <OrderDetail></OrderDetail>
        </Box>
    );
}

function createExpandableData(data: DataIndexable): Array<types.Row> {
    const res = new Array<types.Row>();
    for (let record in data) {
        const row: types.Row = data[record];    
        res.push({...row});
    }
    return res;
}
