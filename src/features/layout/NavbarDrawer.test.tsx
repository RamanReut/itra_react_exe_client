import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Drawer from './NavbarDrawer'
import { BrowserRouter } from 'react-router-dom'

test('navbar-drawer', () => {
    render(
        <BrowserRouter>
            <Drawer
                position='open'
                onClose={() => {}}
            ></Drawer>
        </BrowserRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('navbar-drawer-onClose', () => {
    let isHandleCloseCalled = false;
    const handleClose = () => {isHandleCloseCalled = true}

    render(
        <BrowserRouter>
            <Drawer
                position='open'
                onClose={handleClose}
            ></Drawer>
        </BrowserRouter>
    );

    expect(isHandleCloseCalled).toBeTruthy();
});