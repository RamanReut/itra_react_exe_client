import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { createThemeWithInitialWidth } from '../../share/testTools'
import { store } from '../store'
import { actions, NavbarSelector } from './reducer'
import { Provider } from 'react-redux'
import NavbarContainer from './NavbarContainer'

const desktopTheme = createThemeWithInitialWidth('lg');
const mobileTheme = createThemeWithInitialWidth('xs');

test('navbarContainer-desktop', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={desktopTheme}>
                    <NavbarContainer></NavbarContainer>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
    
    const navbarSelector = new NavbarSelector(store.getState());
    expect(navbarSelector.position).toEqual('open');
    expect(screen.queryByTestId('navbar-drawer')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    store.dispatch(actions.navbar.reset());
});

test('navbarContainer-mobile', () => {
    const Component = () => (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={mobileTheme}>
                    <NavbarContainer></NavbarContainer>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );

    const { rerender } = render(<Component></Component>);
    rerender(<Component></Component>);
    
    let navbarSelector = new NavbarSelector(store.getState());
    expect(navbarSelector.position).toEqual('hide');
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    
    store.dispatch(actions.navbar.setPosition('open'));
    rerender(<Component></Component>);
    navbarSelector = new NavbarSelector(store.getState());
    expect(navbarSelector.position).toEqual('open');
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    store.dispatch(actions.navbar.reset());
});