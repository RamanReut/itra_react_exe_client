import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducer as layout } from '../layout'

const rootReducer = combineReducers({
    //Add here new reducers
    layout,
});

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
});
