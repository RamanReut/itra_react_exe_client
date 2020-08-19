import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './HeaderContainer'
import { store } from '../store'
import { Provider } from 'react-redux'
import { ThemeProvider, Theme } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { createThemeWithInitialWidth } from '../../share/testTools'
import { actions, HeaderSelector } from './reducer'
import userEvent from '@testing-library/user-event'

const desktopTheme = createThemeWithInitialWidth('lg');
const mobileTheme = createThemeWithInitialWidth('xs');

function TestComponent(props: { theme: Theme }) {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={props.theme}>
                    <Header></Header>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

test('headerContainer-desktop', () => {
    const Component = () => (<TestComponent theme={desktopTheme}></TestComponent>);
    const { rerender } = render(<Component></Component>);

    expect(screen.getByTestId('header-path')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    expect((new HeaderSelector(store.getState())).navbarPosition).toEqual('hide');
    userEvent.click(screen.getByRole('button'));
    expect((new HeaderSelector(store.getState())).navbarPosition).toEqual('open');
    
    const inputString = 'hi'
    userEvent.type(screen.getByRole('searchbox'), inputString);
    expect((new HeaderSelector(store.getState())).searchText).toEqual(inputString);
    rerender(<Component></Component>);
    expect(screen.getByDisplayValue(inputString)).toBeInTheDocument();

    store.dispatch(actions.navbar.reset());
    store.dispatch(actions.header.reset());
});

test('header-mobile', () => {
    const Component = () => (<TestComponent theme={mobileTheme}></TestComponent>);
    const { rerender } = render(<Component></Component>);
    rerender(<Component></Component>)

    expect(screen.queryByTestId('header-path')).not.toBeInTheDocument();

    store.dispatch(actions.navbar.reset());
});