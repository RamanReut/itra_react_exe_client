import { types } from './reducer'
import { Column } from 'material-table'

const THE_START_DATE = new Date(0);

export function dateRangeFilter(
    filter: types.DateRange,
    rowData: types.Row,
    columnDef: Column<types.Row>,
) {
    if (filter.start || filter.end) {
        const start = filter.start ? filter.start : THE_START_DATE;
        const end = filter.end ? filter.end : new Date();
        const curDate = new Date(rowData[columnDef.field as types.Columns]);

        if (curDate < start || curDate > end) {
            return false;
        }
    }
    return true;
}
