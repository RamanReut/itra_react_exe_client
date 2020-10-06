import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { reducer as layout } from '../layout'
import { reducer as dataTable } from '../dataTable';

const rootReducer = combineReducers({
    //Add here new reducers
    layout,
    dataTable,
});

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware().prepend(thunk),
});
