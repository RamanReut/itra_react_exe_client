import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    //Add here new reducers
    
});

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
});