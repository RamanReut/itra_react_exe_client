import * as types from './types'
import * as ordersTableSelectors from './ordersTableSelector'
import * as detailSelectors from './detailSelector'
import * as visibleColumnsSelector from './visibleColumnsSelector'
import * as timelineSelector from './timelineSelector'

const selectors = {
    ordersTable: ordersTableSelectors,
    detail: detailSelectors,
    visibleColumns: visibleColumnsSelector,
    timeline: timelineSelector,
}

export { 
    types, 
    ordersTableSelectors, 
    detailSelectors,
    visibleColumnsSelector,
    timelineSelector,
    selectors,
}
export * from './rootReducer';
