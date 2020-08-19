import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NavbarItem from './NavbarItem'
import SettingsIcon from '@material-ui/icons/Settings'
import { BrowserRouter } from 'react-router-dom'

test('navbar-navbarItem', () => {
    render(
        <BrowserRouter>
            <NavbarItem
                icon={<SettingsIcon></SettingsIcon>}
                text='name'
                to='/name'
            ></NavbarItem>
        </BrowserRouter>
    );
    
    expect(screen.getByRole('button').getElementsByTagName('svg')[0]).toBeInTheDocument();
    expect(screen.getByRole('button')).toContainElement(screen.getByText('name'));
    expect(screen.getByRole('button')).toHaveAttribute('href', '/name');
});