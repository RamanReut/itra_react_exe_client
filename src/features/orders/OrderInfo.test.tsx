import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import OrderInfo from './OrderInfo'

const ORDER_ID = 234322
const ORDER_DATE = '2234-05-10'
const REQUIRED_DATE = '2234-05-14'
const SHIPPED_DATE = '2234-08-10'
const MANAGER_NAME = 'Intersting Manager'

beforeEach(() => {
    render(
        <OrderInfo
            order_id={ORDER_ID}
            order_date={ORDER_DATE}
            required_date={REQUIRED_DATE}
            shipped_date={SHIPPED_DATE}
            manager_name={MANAGER_NAME}
        ></OrderInfo>
    );
});

test('order id should be displayed', () => {
    expect(screen.getByText(ORDER_ID.toString())).toBeInTheDocument();
});

test('order date should be displayed', () => {
    expect(screen.getByText(ORDER_DATE)).toBeInTheDocument();
});

test('required date should be displayed', () => {
    expect(screen.getByText(REQUIRED_DATE)).toBeInTheDocument();
});

test('shipped date should be displayed', () => {
    expect(screen.getByText(SHIPPED_DATE)).toBeInTheDocument();
});

test('manager name should be displayed', () => {
    expect(screen.getByText(MANAGER_NAME)).toBeInTheDocument();
});
