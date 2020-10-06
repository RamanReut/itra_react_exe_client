import { types } from './reducer'
import { COLUMNS_LOCALIZATIONS, MAP_STATUS_ID_TO_TEXT } from './constants'
import { Column as TableColumn } from 'material-table'
import DateFilter from './DateFilter'
import { dateRangeFilter } from './dateFilters'

type ColumnSettings = {
    [column in types.Columns]: Column;
}

interface Column {
    field: string;
    title: string;
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
        ...getFieldAndTitle('order_id'),
    },
    order_status: {
        ...getFieldAndTitle('order_status'),
        lookup: MAP_STATUS_ID_TO_TEXT,
    },
    order_date: {
        ...getFieldAndTitle('order_date'),
        type: 'date',
        filterComponent: DateFilter,
        customFilterAndSearch: dateRangeFilter,
    },
    required_date: {
        ...getFieldAndTitle('required_date'),
        type: 'date',
        filterComponent: DateFilter,
        customFilterAndSearch: dateRangeFilter,
    },
    shipped_date: {
        ...getFieldAndTitle('shipped_date'),
        type: 'date',
        filterComponent: DateFilter,
        customFilterAndSearch: dateRangeFilter,
    },
    manager_name: {
        ...getFieldAndTitle('manager_name'),
    },
    customer_name: {
        ...getFieldAndTitle('customer_name'),
    },
    email: {
        ...getFieldAndTitle('email'),
    },
    address: {
        ...getFieldAndTitle('address')
    },
}

function getFieldAndTitle(column: types.Columns) {
    return {
        field: column,
        title: COLUMNS_LOCALIZATIONS[column],
    }
}

export function createColumnSettingList(columns: Array<types.Columns>): Array<Column> {
    return columns.map((column) => ({...columnSettings[column]}));
}
