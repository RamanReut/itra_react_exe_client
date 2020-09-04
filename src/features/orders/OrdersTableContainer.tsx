import { Dispatch } from 'react'
import { connect } from 'react-redux'
import DataTable from './OrdersTable'
import { types, OrdersTableSelector, actions, DetailSelector } from './reducer'

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);

function mapStateToProps(state: types.RootState) {
    const tableSelector = new OrdersTableSelector(state);
    const detailSelector = new DetailSelector(state);

    return {
        data: tableSelector.data,
        visibleColumns: tableSelector.visibleColumns,
        isControlColumnsOpen: tableSelector.isControlColumnsOpen,
        isLoading: tableSelector.isLoading,
        isDetailOpen: detailSelector.isOpen,
        detailId: detailSelector.id,
        tab: detailSelector.tab,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onFetch: () => dispatch(actions.ordersTable.fetchData()),
        onControlColumnsOpenChange: (state: boolean) => 
            dispatch(actions.ordersTable.setIsControlColumnsOpen(state)),
        onVisibilityChange: (columns: Array<types.Columns>) => 
            dispatch(actions.ordersTable.setVisibilityColumns(columns)),
        onDetailOpen: (id: number) => 
            dispatch(actions.detail.open(id)),
        onDetailClose: () => 
            dispatch(actions.detail.close()),
        onChangeTab: (id: number) => {
            dispatch(actions.detail.setTab(id));
        },
    }
}
