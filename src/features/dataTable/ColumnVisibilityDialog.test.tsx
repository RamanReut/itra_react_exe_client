import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render} from '@testing-library/react'
import ColumnVisibilityDialog from './ColumnVisibilityDialog'
import { types, actions, selectors } from './reducer'
import userEvent from '@testing-library/user-event'
import { COLUMNS_LOCALIZATIONS} from './constants'
import { Provider } from 'react-redux'
import { store } from '../store'

let rerender: (ui: React.ReactElement) => void;

function Component() {
    return (
        <Provider store={store}>
            <ColumnVisibilityDialog></ColumnVisibilityDialog>
        </Provider>
    );
}

beforeEach(() => {
    store.dispatch(actions.openVisibleColumnsDialog());
    const renderResult = render(
        <Component></Component>
    );
    rerender = renderResult.rerender;
});

afterEach(() => {
    store.dispatch(actions.reset());
});

test('after click on cancel button dialog should be closed', () => {
    cancelClick();
    rerender(<Component></Component>);
    expect(getDialog()).not.toBeVisible();
});

test('after click on ok button dialog should be closed', () => {
    okClick();
    rerender(<Component></Component>);
    expect(getDialog()).not.toBeVisible();
});

test('after click cancel button visibleColumns should not be change', () => {
    const isManagerNameInclude = getManagerNameIsInclude();
    clickManagerNameCheckbox();
    cancelClick();
    expect(isManagerNameInclude).toEqual(getManagerNameIsInclude());
});

test('after click ok button visibleColumns should be change', () => {
    const isManagerNameInclude = getManagerNameIsInclude();
    clickManagerNameCheckbox();
    cancelClick();
    expect(isManagerNameInclude).toEqual(getManagerNameIsInclude());
});


function clickManagerNameCheckbox() {
    clickCheckbox('manager_name');
}

function clickCheckbox(column: types.Columns) {
    userEvent.click(getColumnCheckbox(column));
}

function okClick() {
    userEvent.click(screen.getByRole('button', { name: 'Ok' }));
}

function cancelClick() {
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
}

function getColumnCheckbox(column: types.Columns) {
    return screen.getByRole('checkbox', { name: getColumnName(column) });
}

function getColumnName(column: types.Columns): string {
    return COLUMNS_LOCALIZATIONS[column];
}

function getDialog() {
    return screen.getByRole('dialog');
}

function getManagerNameIsInclude() {
    return selectors.visibleColumns(store.getState()).includes('manager_name');
}
