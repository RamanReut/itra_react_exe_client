import { createSelector } from '@reduxjs/toolkit'
import { timeline } from './rootSelector'

export const activeStep = createSelector(
    timeline,
    (state) => state.activeStep,
);
