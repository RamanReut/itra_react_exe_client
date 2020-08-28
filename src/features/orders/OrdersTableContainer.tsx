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
        isDetailOpen: detailSelector.isOpen,
        detailId: detailSelector.id,
        expandedDetailGroups: detailSelector.expandedGroups,
        expandedDetailProduct: detailSelector.expandedProduct,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onFetch: () => dispatch(actions.ordersTable.fetchData()),
        onToggleVisibility: (id: string) => 
            dispatch(actions.ordersTable.toggleVisibility(id as types.Columns)),
        onDetailOpen: (id: number) => 
            dispatch(actions.detail.open(id)),
        onDetailClose: () => 
            dispatch(actions.detail.close()),
        onToggleDetailExpandGroup: (group: types.DetailGroup) =>
            dispatch(actions.detail.toggleExpandGroup(group)),
        onToggleDetailExpandProduct: (product: string) => 
            dispatch(actions.detail.toggleExpandProduct(product)),
    }
}