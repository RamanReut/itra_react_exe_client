import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import CustomerInfo from './CustomerInfo'

const CUSTOMER_NAME = 'Some Customer'
const EMAIL = 'customer@email.com'
const ADDRESS = 'Another, Client, Address'

beforeEach(() => {
    render(
        <CustomerInfo
            customer_name={CUSTOMER_NAME}
            email={EMAIL}
            address={ADDRESS}
        ></CustomerInfo>
    );
});

test('customer name should be displayed', () => {
    expect(screen.getByText(CUSTOMER_NAME)).toBeInTheDocument();
});

test('email should be displayed', () => {
    expect(screen.getByText(EMAIL)).toBeInTheDocument();
});

test('address should be displayed', () => {
    expect(screen.getByText(ADDRESS)).toBeInTheDocument();
});
