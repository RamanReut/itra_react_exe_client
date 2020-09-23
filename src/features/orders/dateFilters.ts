import { types } from './reducer'
import { Column } from 'material-table'

const THE_START_DATE = new Date(0);

export function dateRangeFilter(
    filter: types.DateRange,
    rowData: types.Row,
    columnDef: Column<types.Row>,
) {
    const {
        start = THE_START_DATE,
        end = new Date(),
    } = filter;
    const curDate = new Date(rowData[columnDef.field as types.Columns]);

    if (curDate < start && curDate > end) {
        return false;
    }
    return true;
}
