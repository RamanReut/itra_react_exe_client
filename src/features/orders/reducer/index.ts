import * as types from './types'
import * as ordersTableSelectors from './ordersTableSelector'
import * as detailSelectors from './detailSelector'

const selectors = {
    ordersTable: ordersTableSelectors,
    detail: detailSelectors,
}

export { 
    types, 
    ordersTableSelectors, 
    detailSelectors,
    selectors,
}
export * from './rootReducer';
