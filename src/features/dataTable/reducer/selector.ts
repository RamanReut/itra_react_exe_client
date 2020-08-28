import { RootSelector } from '../../../share/reduxTools'
import * as types from './types'

export class DataTableSelector extends RootSelector<types.RootState> {
    private get DataTable(): types.DataTableState {
        return this._state.dataTable;
    }

    public get visibleColumns(): Array<types.Columns> {
        return this.DataTable.visibleColumns;
    }

    public get data(): Array<types.Row> {
        return this.DataTable.data;
    }
}
