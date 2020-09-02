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
        isControlColumnsOpen: selector.isControlColumnsOpen,
        isLoading: selector.isLoading,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onFetch: () => 
            dispatch(actions.fetchData()),
        onControlColumnsOpenChange: (state: boolean) => 
            dispatch(actions.setIsControlColumnsOpen(state)),
        onVisibilityChange: (visibileColumns: Array<types.Columns>) =>
            dispatch(actions.setVisibilityColumns(visibileColumns)),
    }
}
