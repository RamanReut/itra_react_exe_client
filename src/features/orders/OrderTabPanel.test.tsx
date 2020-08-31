import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import OrderTabPanel from './OrderTabPanel'
import { types } from './reducer'
import userEvent from '@testing-library/user-event'

const DATA: types.Record = {
    order_id: 990223,
    order_status: 2,
    order_date: '2234-04-24',
    required_date: '2234-05-01',
    shipped_date: '2234-04-28',
    manager_name: 'Useful Manager',
    customer_name: 'First Customer',
    email: 'customer@email.com',
    address: 'VIP, Customer, Address',
    order_items: [
        {
            product: 'Product name',
            brand: 'Major brand',
            model_year: 2020,
            quantity: 10,
            list_price: 343,
            discount: 0.09,
        },
    ],
};

interface ComponentProps {
    tab?: number;
    onChangeTab?: (id: number) => void;
    data?: types.Record,
}

let rerender: (ui: React.ReactElement) => void;
let tabClicked: string;

function Component({
    tab = 0,
    onChangeTab = (id: number) => {
        tabClicked = ['order', 'customer', 'items'][id];
    },
    data = DATA
}: ComponentProps ) {
    return (
        <OrderTabPanel
            tab={tab}
            onChangeTab={onChangeTab}
            data={data}
        ></OrderTabPanel>
    );
}

beforeEach(() => {
    const { rerender: rend } = render(<Component></Component>);
    rerender = rend;
    tabClicked = '';
});

test('should be exist order tab', () => {
    expect(screen.getByRole('tab', { name: 'Order' })).toBeInTheDocument();
});

test('should be exist customer tab', () => {
    expect(screen.getByRole('tab', { name: 'Customer' })).toBeInTheDocument();
});

test('should be exist items tab', () => {
    expect(screen.getByRole('tab', { name: 'Items' })).toBeInTheDocument();
});

test('after user clicked on Order tab tabClicked should contain order string', () => {
    userEvent.click(screen.getByRole('tab', { name: 'Order' }));
    expect(tabClicked).toEqual('order');
});

test('after user clicked on Customer tab tabClicked should contain customer string', () => {
    userEvent.click(screen.getByRole('tab', { name: 'Customer' }));
    expect(tabClicked).toEqual('customer');
});

test('after user clicked on Items tab tabClicked should contain items string', () => {
    userEvent.click(screen.getByRole('tab', { name: 'Items' }));
    expect(tabClicked).toEqual('items');
});

test('order info should be visible when selected order tab', () => {
    rerender(<Component tab={0}></Component>);
    expect(screen.getByText(DATA.order_date)).toBeVisible();
});

test('customer info should be visible when selected customer tab', () => {
    rerender(<Component tab={1}></Component>);
    expect(screen.getByText(DATA.customer_name)).toBeVisible();
});

test('order items info should be visible when selected items tab', () => {
    rerender(<Component tab={2}></Component>);
    expect(screen.getByText(DATA.order_items[0].product)).toBeVisible();
});
