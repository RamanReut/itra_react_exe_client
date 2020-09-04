import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ColumnVisibilityControl from './ColumnVisibilityControl'
import { types } from './reducer'
import { COLUMNS, VISIBLE } from './testConstants'

let lastClickedCheckbox: types.Columns | null;
let handleClick: (id: types.Columns) => void;

function createHandleClick() {
    return jest.fn((id: types.Columns) => {
        lastClickedCheckbox = id;
    });
}

function Component({
    columns = COLUMNS,
    visible = VISIBLE,
    onClick = handleClick,
}) {
    return (
        <ColumnVisibilityControl
            columns={columns}
            visible={visible}
            onClick={onClick}
        ></ColumnVisibilityControl>
    );
}

beforeEach(() => {
    handleClick = createHandleClick();
    lastClickedCheckbox = null;

    render(<Component></Component>);
});

test('all columns should be displayed as checkbox', () => {
    expect(screen.getAllByRole('checkbox')).toHaveLength(COLUMNS.size);
    COLUMNS.forEach((name) => {
        expect(screen.getByRole('checkbox', { name: name }));
    });
});

test('all column names must be exist in the document', () => {
    COLUMNS.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
    });
});

test('columns in visible prop should be checked', () => {
    VISIBLE.forEach((column) => {
        expect(
            screen.getByRole(
                'checkbox', 
                { name: COLUMNS.get(column) as string },
            )
        ).toBeChecked();
    });
});

test('columns not contain in visible prop should not be checked', () => {
    COLUMNS.forEach((name, column) => {
        if (!VISIBLE.includes(column)) {
            expect(getColumnCheckbox(column)).not.toBeChecked();
        }
    });
});

test('after clicked on checkbox handleClick should be called', () => {
    clickCheckbox('order_id');
    expect(handleClick).toBeCalled();
});

test('after clicked on order_id checkbox should be called handleClick with id = order_id', 
    () => {
        const orderId = 'order_id'
        clickCheckbox(orderId);
        expect(lastClickedCheckbox).toEqual(orderId);
    },
);

function clickCheckbox(column: types.Columns) {
    userEvent.click(getColumnCheckbox(column));
}

function getColumnCheckbox(column: types.Columns) {
    return screen.getByRole('checkbox', { name: getColumnName(column) });
}

function getColumnName(column: types.Columns): string {
    return COLUMNS.get(column) as string;
}
