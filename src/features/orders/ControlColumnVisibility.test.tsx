import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ControlColumnVisibility from './ControlColumnVisibility'
import userEvent from '@testing-library/user-event'

test('dataTable-ControlColumnVisibility', () => {
    const columns = new Map<string, string>([['first', 'firstLabel'], ['second', 'secondLabel']]);
    let lastClick: string;
    const handleClick = (id: string) => { lastClick = id };
    render (
        <ControlColumnVisibility
            columns={columns}
            visible={['second']}
            onClick={handleClick}
        ></ControlColumnVisibility>
    );

    columns.forEach((label, id) => {
        const testNode = screen.getByText(label);

        expect(testNode).toBeInTheDocument();

        userEvent.click(testNode);
        expect(lastClick).toEqual(id);

        if(id === 'second') {
            expect(testNode.parentElement).toHaveClass('MuiChip-colorPrimary');
        } else {
            expect(testNode.parentElement).not.toHaveClass('MuiChip-colorPrimary');
        }
    });
});