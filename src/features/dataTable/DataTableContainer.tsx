import { Dispatch } from 'react'
import { connect } from 'react-redux'
import DataTable from './DataTable'
import { types, DataTableSelector, actions } from './reducer'

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);

function mapStateToProps(state: types.RootState) {
    const selector = new DataTableSelector(state);

    return {
        data: selector.data,
        visibleColumns: selector.visibleColumns,
    }
}

function mapDispatchToProps(dispath: Dispatch<any>) {
    return {
        onFetch: () => dispath(actions.fetchData()),
        onToggleVisibility: (id: string) => dispath(actions.toggleVisibility(id as types.Columns)),
    }
}
