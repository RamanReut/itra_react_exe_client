import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import ControlColumnVisibility from './ColumnVisibilityControl'
import userEvent from '@testing-library/user-event'

const defaultColumns = new Map<string, string>([
    ['first', 'firstLabel'], 
    ['second', 'secondLabel']
]);
const defaultVisible = ['first', 'second'];
const defaultHandleClick = (id: string) => {};

function Component({
    columns = defaultColumns,
    visible = defaultVisible,
    onClick = defaultHandleClick,
}) {
    return (
        <ControlColumnVisibility
            columns={columns}
            visible={visible}
            onClick={onClick}
        ></ControlColumnVisibility>
    );
}

function getButtonWithId(id: string) {
    return screen.getByRole('button', { name: defaultColumns.get(id) });
}

test('component should render two buttons with label firstLabel and secondLabel', () => {
    render(<Component></Component>);

    expect(screen.getAllByRole('button')).toHaveLength(defaultColumns.size);
    defaultColumns.forEach((name) => {
        expect(screen.getByRole('button', { name: name })).toBeInTheDocument();
    });
});

test('visible and unvisible button should have different classes', () => {
    render(<Component visible={['second']}></Component>);

    expect(getButtonWithId('first').className)
        .not.toEqual(getButtonWithId('second').className);  
});

test('after user click event handler should return button id', () => {
    let buttonId = '';
    const handleClick = (id: string) => { buttonId = id};

    render(<Component onClick={handleClick}></Component>);
    userEvent.click(getButtonWithId('first'));
    expect(buttonId).toEqual('first');
});
