import * as types from './types'
import * as ordersTableSelectors from './ordersTableSelector'
import * as detailSelectors from './detailSelector'
import * as visibleColumnsSelector from './visibleColumnsSelector'
import * as timelineSelector from './timelineSelector'
import { selectors as filtersSelector } from './filters'

const selectors = {
    ordersTable: ordersTableSelectors,
    detail: detailSelectors,
    visibleColumns: visibleColumnsSelector,
    timeline: timelineSelector,
    filters: filtersSelector,
}

export { 
    types, 
    ordersTableSelectors, 
    detailSelectors,
    visibleColumnsSelector,
    timelineSelector,
    filtersSelector,
    selectors,
}
export * from './rootReducer';
