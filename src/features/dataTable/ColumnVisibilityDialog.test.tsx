import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render} from '@testing-library/react'
import ColumnVisibilityDialog from './ColumnVisibilityDialog'
import { types } from './reducer'
import userEvent from '@testing-library/user-event'
import { COLUMNS, VISIBLE } from './testConstants'

let visibleColumns: Array<types.Columns> = [];

function _handleClose() {};
function _handleVisibilityChange (columns: Array<types.Columns>) {
    visibleColumns = columns;
};

let handleClose: () => void;
let handleVisibilityChange: (columns: Array<types.Columns>) => void;
let rerender: (ui: React.ReactElement) => void;

function Component({
    columns = COLUMNS,
    visible = VISIBLE,
    isOpen = true,
    onClose = handleClose,
    onVisibilityChange = handleVisibilityChange,
} ) {
    return (
        <ColumnVisibilityDialog
            columns={columns}
            visible={visible}
            isOpen={isOpen}
            onClose={onClose}
            onVisibilityChange={onVisibilityChange}
        ></ColumnVisibilityDialog>
    );
}

beforeEach(() => {
    handleClose = jest.fn(_handleClose);
    handleVisibilityChange = jest.fn(_handleVisibilityChange);
    visibleColumns = [];

    const renderResult = render(
        <Component></Component>
    );
    rerender = renderResult.rerender;
});

test('after click on cancel button dialog should be closed', () => {
    cancelClick();
    expect(handleClose).toHaveBeenCalled();
});

test('after click on ok button dialog should be closed', () => {
    okClick();
    expect(handleClose).toHaveBeenCalled();
});

test('after click cancel button handleVisibilityChange should not be called', () => {
    clickManagerNameCheckbox();
    cancelClick();
    expect(handleVisibilityChange).not.toHaveBeenCalled();
});

test('after click ok button handleVisibilityChange should be called', () => {
    clickManagerNameCheckbox();
    okClick();
    expect(handleVisibilityChange).toHaveBeenCalled();
});

test('after click ok button visibleColumns should be contain manager_name', () => {
    clickManagerNameCheckbox();
    okClick();
    expect(visibleColumns).toContain('manager_name');
});

test('after click on order_id checkbox should not be checked', () => {
    clickCheckbox('order_id');
    expect(getColumnCheckbox('order_id')).not.toBeChecked();
});

test('after unchecked order_id checkbox and ok click visibleColumns should not contain order_id', 
    () => {
        clickCheckbox('order_id');
        okClick();
        expect(visibleColumns).not.toContain('order_id');
    }
);

test('is isOpen = false then dialog should not be visible', () => {
    rerender(<Component isOpen={false}></Component>);

    expect(screen.getByRole('dialog')).not.toBeVisible();
});

function clickManagerNameCheckbox() {
    clickCheckbox('manager_name');
}

function clickCheckbox(column: types.Columns) {
    userEvent.click(getColumnCheckbox(column));
}

function okClick() {
    userEvent.click(screen.getByRole('button', { name: 'Ok' }));
}

function cancelClick() {
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
}

function getColumnCheckbox(column: types.Columns) {
    return screen.getByRole('checkbox', { name: getColumnName(column) });
}

function getColumnName(column: types.Columns): string {
    return COLUMNS.get(column) as string;
}
