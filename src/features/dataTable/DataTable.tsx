import React, { useMemo, useEffect, useCallback } from 'react'
import MaterialTable from 'material-table'
import { types, actions, selectors } from './reducer'
import { useSelector, useDispatch  } from 'react-redux'
import TableToolbar from './TableToolbar'
import TableBackdrop from './TableBackdrop'
import LoadingError from './LoadingError'
import { createColumnSettingList } from './dataTableColumnSettings'

export default function DataTable() {
    const dispatch = useDispatch();

    const handleFetch = useCallback(
        () => {
            dispatch(actions.fetchData());
        },
        [dispatch],
    );
    const visibleColumns = useSelector(selectors.visibleColumns);
    const data = useSelector(selectors.data);
    const isLoading = useSelector(selectors.isLoading);
    const isLoaingFailed = useSelector(selectors.isLoadingFailed);

    const columns = useMemo(
        () => createColumnSettingList(visibleColumns), [visibleColumns]);
    const dataExistable = useMemo(() => createExistableData(data), [data]);

    useEffect(() => {
        handleFetch();
    }, [handleFetch])

    if(isLoading) {
        return <TableBackdrop></TableBackdrop>;
    }

    if(isLoaingFailed) {
        return <LoadingError></LoadingError>
    }

    return (
        <MaterialTable
            columns={columns}
            data={dataExistable}
            components={{
                Toolbar: props => (<TableToolbar {...props}></TableToolbar>),
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



function createExistableData(data: Array<types.Row>) {
    return data.map((elem) => {
        return {...elem}
    });
}
