import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import NavbarChangePosition from './NavbarChangePosition'

let isClicked = false;
function defaultClickHandler() {
    isClicked = true;
}

let rerender: (ui: React.ReactElement) => void;

beforeEach(() => {
    const { rerender: r } = render(
        <NavbarChangePosition 
            state='open' 
            onClick={defaultClickHandler}
        ></NavbarChangePosition>
    );
    rerender = r;
});

afterEach(() => {
    isClicked = false;
});

test('pass click handler function', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(isClicked).toBeTruthy()
});

test('different icon for different state', () => {
    const icon = screen.getByRole('button').getElementsByTagName('svg')[0];

    rerender(
        <NavbarChangePosition 
            state='hide' 
            onClick={()=>{}}
        ></NavbarChangePosition>
    );
    expect(screen.getByRole('button')).not.toContainElement(icon);
});
