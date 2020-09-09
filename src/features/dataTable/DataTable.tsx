import React, { useMemo, useEffect, useCallback } from 'react'
import MaterialTable from 'material-table'
import { types, actions, selectors } from './reducer'
import { useSelector, useDispatch  } from 'react-redux'
import { COLUMNS_LOCALIZATIONS } from './constants'
import TableToolbar from './TableToolbar'

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

    const columns = useMemo(() => createColumnList(visibleColumns), [visibleColumns]);
    const dataExistable = useMemo(() => createExistableData(data), [data]);

    useEffect(() => {
        handleFetch();
    }, [handleFetch])

    return (
        <MaterialTable
            isLoading={isLoading}
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

interface Column {
    field: string;
    title: string;
    type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
}

function createColumnList(columns: Array<types.Columns>): Array<Column> {
    return modifyColumnList(createColumnLocalizationList(columns));
}

interface modifier {
    (list: Array<Column>): void;
}

const modifiers: Array<modifier> = [
    modifyRequiredDate,
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

function createColumnLocalizationList(columns: Array<types.Columns>): Array<Column>{
    return columns.map((column) => {
        return {
            field: column,
            title: COLUMNS_LOCALIZATIONS.get(column) || '',
        }
    });
}

function createExistableData(data: Array<types.Row>) {
    return data.map((elem) => {
        return {...elem}
    });
}
