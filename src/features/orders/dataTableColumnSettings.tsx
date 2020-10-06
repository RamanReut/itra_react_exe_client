import { types } from './reducer'
import { MAP_STATUS_ID_TO_TEXT } from './constants'
import { Column as TableColumn } from 'material-table'
import DateFilter from './DateFilter'
import { dateRangeFilter } from './dateFilters'

type ColumnSettings = {
    [column in types.Columns]: Column;
}

interface Column {
    field: string;
    type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
    lookup?: object;   
    filterComponent?: (props: {
        columnDef: TableColumn<types.Row>;
        onFilterChanged: (rowId: string, value: types.DateRange) => void;
    }) => React.ReactElement<any>;
    customFilterAndSearch?: (
        filter: types.DateRange,
        rowData: types.Row,
        columnDef: TableColumn<types.Row>,
    ) => boolean,
}

const columnSettings: ColumnSettings = {
    order_id: {
        ...getField('order_id'),
    },
    order_status: {
        ...getField('order_status'),
        lookup: MAP_STATUS_ID_TO_TEXT,
    },
    order_date: {
        ...getField('order_date'),
        type: 'date',
        filterComponent: DateFilter,
        customFilterAndSearch: dateRangeFilter,
    },
    required_date: {
        ...getField('required_date'),
        type: 'date',
        filterComponent: DateFilter,
        customFilterAndSearch: dateRangeFilter,
    },
    shipped_date: {
        ...getField('shipped_date'),
        type: 'date',
        filterComponent: DateFilter,
        customFilterAndSearch: dateRangeFilter,
    },
    manager_name: {
        ...getField('manager_name'),
    },
    customer_name: {
        ...getField('customer_name'),
    },
    email: {
        ...getField('email'),
    },
    address: {
        ...getField('address')
    },
}

function getField(column: types.Columns) {
    return {
        field: column,
    }
}

export function createColumnSettingList(
    columns: Array<types.Columns>,
    mapTitle: Record<string, string>,
): Array<Column> {
    return columns.map((column) => ({
        ...columnSettings[column],
        title: mapTitle[column],
    }));
}
