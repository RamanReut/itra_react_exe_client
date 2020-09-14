import * as types from './types'
import * as ordersTableSelectors from './ordersTableSelector'
import * as detailSelectors from './detailSelector'
import * as visibleColumnsSelector from './visibleColumnsSelector'

const selectors = {
    ordersTable: ordersTableSelectors,
    detail: detailSelectors,
    visibleColumns: visibleColumnsSelector,
}

export { 
    types, 
    ordersTableSelectors, 
    detailSelectors,
    visibleColumnsSelector,
    selectors,
}
export * from './rootReducer';
