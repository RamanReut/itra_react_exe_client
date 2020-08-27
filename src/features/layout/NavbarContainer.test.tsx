import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { createThemeWithInitialWidth } from '../../share/testTools'
import { store } from '../store'
import { actions } from './reducer'
import { Provider } from 'react-redux'
import NavbarContainer from './NavbarContainer'
import userEvent from '@testing-library/user-event'

const desktopTheme = createThemeWithInitialWidth('lg');
const mobileTheme = createThemeWithInitialWidth('xs');

afterEach(() => {
    store.dispatch(actions.navbar.reset());
});

function DesktopComponent() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={desktopTheme}>
                    <NavbarContainer></NavbarContainer>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
}

test('in desktop version navbar must not be contain in drawer', () => {
    render(<DesktopComponent></DesktopComponent>);
    
    expect(screen.queryByTestId('navbar-drawer')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('after click on hide button navbar shoul be collapsed', () => {
    const { rerender } = render(<DesktopComponent></DesktopComponent>)
    userEvent.click(screen.getByRole('button', { name: '' }));
    rerender(<DesktopComponent></DesktopComponent>);
    expect(screen.getByText('Home')).toBeInTheDocument();
});

test('in mobile version navigation menu must be hide after component mount', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={mobileTheme}>
                    <NavbarContainer></NavbarContainer>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});
