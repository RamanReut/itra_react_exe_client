import { combineReducers } from '@reduxjs/toolkit'
import * as detail from './detailReducer'
import * as ordersTable from './ordersTableReducer'

export const reducer = combineReducers({
    detail: detail.reducer,
    ordersTable: ordersTable.reducer,
});

export const actions = {
    detail: detail.actions,
    ordersTable: ordersTable.actions,
}