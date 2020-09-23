import { createReducer } from '../../../share/dateRangePicker'
import { ROOT_REDUCER_NAME } from './constants'
import { filters } from './rootSelector'
import { createSelector, combineReducers } from '@reduxjs/toolkit'

const BASIC_REDUCER_NAME = `${ROOT_REDUCER_NAME}/filters`

const orderDateSelector = createSelector(
    filters,
    (state) => state.orderDate,
);
const shippedDateSelector = createSelector(
    filters,
    (state) => state.shippedDate,
);
const requiredDateSelector = createSelector(
    filters,
    (state) => state.requiredDate,
)

const orderDateReducer = createReducer(
    `${BASIC_REDUCER_NAME}/orderDate`,
    orderDateSelector,
);
const shippedDateReducer = createReducer(
    `${BASIC_REDUCER_NAME}/shippedDate`,
    shippedDateSelector,
);
const requiredDateReducer = createReducer(
    `${BASIC_REDUCER_NAME}/requiredDate`,
    requiredDateSelector,
);

export const reducer = combineReducers({
    orderDate: orderDateReducer.reducer,
    shippedDate: shippedDateReducer.reducer,
    requiredDate: requiredDateReducer.reducer
});

export const actions = {
    orderDate: orderDateReducer.actions,
    shippedDate: shippedDateReducer.actions,
    requiredDate: requiredDateReducer.actions,
};

export const selectors = {
    orderDate: orderDateReducer.selectors,
    shippedDate: shippedDateReducer.selectors,
    requiredDate: requiredDateReducer.selectors,
}
