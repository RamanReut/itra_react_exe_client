import { combineReducers } from '@reduxjs/toolkit'
import { reducer as navbar } from './navbarReducer'
import { reducer as header } from './headerReducer'

export const reducer = combineReducers({
    navbar,
    header,
});