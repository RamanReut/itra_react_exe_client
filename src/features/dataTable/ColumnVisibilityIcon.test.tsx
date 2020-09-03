import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ColumnVisibilityIcon from './ColumnVisibilityIcon'

let handleClick: () => void;

function createHandleClick() {
    return jest.fn();
}

function Component({
    onClick = handleClick,
}) {
    return(<ColumnVisibilityIcon onClick={onClick}></ColumnVisibilityIcon>);
}

beforeEach(() => {
    handleClick = createHandleClick();

    render(<Component></Component>);
});

test('after click on icon must be called handleClick', () => {
    userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
});
