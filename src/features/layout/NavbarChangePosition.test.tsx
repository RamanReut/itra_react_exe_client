import React from 'react'
import { render, screen, fireEvent, getByRole } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import NavbarChangePosition from './NavbarChangePosition';

test('NavbarChangePosition-exist', () => {
    render (<NavbarChangePosition state='open'></NavbarChangePosition>);

    expect(screen.getByRole('button')).toBeInTheDocument();
});

test('NavbarChangePosition-click', () => {
    let isClicked = false;
    const handleClick = () => {isClicked = true};

    render(<NavbarChangePosition state='open' onClick={handleClick}></NavbarChangePosition>);
    fireEvent.click(screen.getByRole('button'));

    expect(isClicked).toBeTruthy()
});

test('NavbarChangePosition-changeIcon', () => {
    const { rerender } = render(
        <NavbarChangePosition 
            state='open' 
            onClick={()=>{}}
        ></NavbarChangePosition>
    );
    const icon = screen.getByRole('button').getElementsByTagName('svg')[0];
    
    rerender(
        <NavbarChangePosition 
            state='hide' 
            onClick={()=>{}}
        ></NavbarChangePosition>
    );
    expect(screen.getByRole('button')).not.toContainElement(icon);
});