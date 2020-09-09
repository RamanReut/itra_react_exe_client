import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { actions } from './reducer'
import { store } from '../store'
import { Provider } from 'react-redux'
import ColumnVisibillity from './ColumnVisibility'

function Component() {
    return (
        <Provider store={store}>
            <ColumnVisibillity></ColumnVisibillity>
        </Provider>
    );
}

beforeEach(() => {
    render(<Component></Component>);
});

afterEach(() => {
    store.dispatch(actions.reset());
});

test('after mount dialog should be closed', () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('after click on button, dialog should be displayed', () => {
    userEvent.click(getIconButton());

    expect(screen.getByRole('dialog')).toBeInTheDocument();
});

function getIconButton() {
    return screen.getByRole(
        (role, element) => {
            if (role === 'button') {
                return element.getElementsByTagName('svg').length !== 0;
            }
            return false;
        }, { 
            hidden: true,
        },
    );
}
