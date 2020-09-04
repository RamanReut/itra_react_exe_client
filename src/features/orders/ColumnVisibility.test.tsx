import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { types } from './reducer'
import ColumnVisibility from './ColumnVisibility'
import { COLUMNS, VISIBLE } from './testConstants'

let isOpenChange: boolean;
let handleOpenChange: (state: boolean) => void;
let handleVisibilityChange: (visibleColumns: Array<types.Columns>) => void;
let rerender: (ui: React.ReactElement) => void;

function createHandleOpenChange() {
    return jest.fn((state: boolean) => {isOpenChange=state});
}

function createHandleVisibilityChange() {
    return jest.fn((visibleColumns: Array<types.Columns>) => {});
}

function Component({
    columns = COLUMNS,
    visible = VISIBLE,
    onOpenChange = handleOpenChange,
    isOpen = true,
    onVisibilityChange = handleVisibilityChange,
}) {
    return (
        <ColumnVisibility
            columns={columns}
            visible={visible}
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            onVisibilityChange={onVisibilityChange}
        ></ColumnVisibility>
    );
}

beforeEach(() => {
    handleOpenChange = createHandleOpenChange();
    handleVisibilityChange = createHandleVisibilityChange();
    isOpenChange = true;

    const renderResult = render(<Component></Component>);
    rerender = renderResult.rerender;
});

test('if icon button was clicked then handleOpenChange should be called', () => {
    rerender(<Component isOpen={false}></Component>);
    userEvent.click(getIconButton());

    expect(handleOpenChange).toHaveBeenCalled();
});

test('if icon button was clicked then isOpenChange should be true', () => {
    rerender(<Component isOpen={false}></Component>);
    userEvent.click(getIconButton());

    expect(isOpenChange).toBeTruthy();
});

test('if isOpen prop equals false then dialog should not be visible', () => {
    rerender(<Component isOpen={false}></Component>);

    expect(screen.getByRole('dialog')).not.toBeVisible();
});

test('if isOpen prop equals true then dialog should be visible', () => {
    rerender(<Component isOpen={true}></Component>);

    expect(screen.getByRole('dialog')).toBeVisible();
});

test('all columns should be in the document', () => {
    COLUMNS.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
    });
});

test('', () => {
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(handleOpenChange).toBeCalled();
});

test('', () => {
    userEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(handleOpenChange).toBeCalled();
});

test('', () => {
    userEvent.click(
        screen.getByRole(
            'checkbox', 
            { name: COLUMNS.get('manager_name') as string },
        ), 
    );
    userEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(handleVisibilityChange).toBeCalled();
});

function getIconButton() {
    return screen.getByRole(
        (role, element) => {
            if (role === 'button') {
                return element.getElementsByTagName('svg').length !== 0;
            }
            return false;
        }, { 
            hidden: true,
        },
    );
}
