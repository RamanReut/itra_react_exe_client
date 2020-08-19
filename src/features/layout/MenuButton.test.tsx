import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MenuButton from './MenuButton';

test('MenuButton-exist', () => {
    render (<MenuButton state='open'></MenuButton>);

    expect(screen.getByRole('button')).toBeInTheDocument();
});

test('MenuButton-innerIcon', () => {
    render (<MenuButton state='open'></MenuButton>);

    expect(screen.getByRole('button'))
        .toContainElement(screen.getByTestId('header-menuButton-icon'));
});

test('MenuButton-click', () => {
    let isClicked = false;
    const handleClick = () => {isClicked = true};

    render(<MenuButton state='open' onClick={handleClick}></MenuButton>);
    fireEvent.click(screen.getByRole('button'));

    expect(isClicked).toBeTruthy()
});

test('MenuButton-changeIcon', () => {
    const { rerender } = render(<MenuButton state='open'></MenuButton>);
    const openIcon = screen.getByTestId('header-menuButton-icon');

    rerender(<MenuButton state='hide'></MenuButton>)
    expect(screen.getByRole('button')).not.toContainElement(openIcon)
});