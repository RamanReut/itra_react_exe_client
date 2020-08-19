import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import List, { useStyles } from './NavbarList'
import { BrowserRouter } from 'react-router-dom'
import { notDeepEqual } from 'assert'

test('navbar-list', () => {
    render(
        <BrowserRouter>
            <List></List>
        </BrowserRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
});