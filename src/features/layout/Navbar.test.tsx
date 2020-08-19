import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Navbar from './Navbar'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { createThemeWithInitialWidth } from '../../share/testTools'

const desktopTheme = createThemeWithInitialWidth('lg');
const mobileTheme = createThemeWithInitialWidth('xs');

test('navbar', () => {
    render(
        <BrowserRouter>
            <ThemeProvider theme={desktopTheme}>
                <Navbar
                    position='open'
                    onClose={() => {}}
                ></Navbar>
            </ThemeProvider>
        </BrowserRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('navbar-desktop', () => {
    render(
        <BrowserRouter>
            <ThemeProvider theme={desktopTheme}>
                <Navbar
                    position='open'
                    onClose={() => {}}
                ></Navbar>
            </ThemeProvider>
        </BrowserRouter>
    );

    expect(screen.queryByTestId('navbar-drawer')).not.toBeInTheDocument();
});

test('navbar-mobile', () => {
    let isHandleCloseCalled = false;
    const handleClose = () => {isHandleCloseCalled = true};

    render(
        <BrowserRouter>
            <ThemeProvider theme={mobileTheme}>
                <Navbar
                    position='open'
                    onClose={handleClose}
                ></Navbar>
            </ThemeProvider>
        </BrowserRouter>
    );

    expect(screen.getByTestId('navbar-drawer')).toBeInTheDocument();
    expect(isHandleCloseCalled).toBeTruthy();
});