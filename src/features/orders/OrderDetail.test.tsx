import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import OrderDetail from './OrderDetail'
import { DATA } from './testConstants'
import userEvent from '@testing-library/user-event'

let handleClose: () => void;
let handleChangeTab: (id: number) => void;
let rerender: (ui: React.ReactElement) => void;

function createHandleClose() {
    return jest.fn();
}

function createHandleChangeTab() {
    return jest.fn();
}

function Component({
    isOpen = true,
    id = 5,
    data = DATA,
    onClose = handleClose,
    tab = 1,
    onChangeTab = handleChangeTab,
}) {
    return (
        <OrderDetail
            isOpen={isOpen}
            id={id}
            data={data}
            onClose={onClose}
            tab={tab}
            onChangeTab={onChangeTab}
        ></OrderDetail>
    );
}

beforeEach(() => {
    handleClose = createHandleClose();
    handleChangeTab = createHandleChangeTab();
    const renderResult = render(<Component></Component>);
    rerender = renderResult.rerender;
});

test('if isOpen equals true then drawer should be open', () => {
    rerender(<Component isOpen={true}></Component>);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
});

test('if isOpen equals false then drawer should be open', () => {
    rerender(<Component isOpen={false}></Component>);
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
});

test('after click on close button should be call handleOpen', () => {
    userEvent.click(screen.getByRole('button'));
    expect(handleClose).toBeCalled();
});
