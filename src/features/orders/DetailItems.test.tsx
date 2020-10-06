import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import DetailItems from './DetailItems'
import { types } from './reducer'
import Item from '../layout/NavbarItem'

function generateItems(productNames: Array<string>): Array<types.OrderItem> {
    return productNames.map((name: string) => ({
        product: name,
        brand: '',
        model_year: 2020,
        quantity: 1,
        list_price: 1,
        discount: 1,
    }));
}

const ITEMS = generateItems([
    'intersting items', 
    'more intersting',
    'very dumb product',
]);

beforeEach(() => {
    render(
        <DetailItems
            items={ITEMS}
        ></DetailItems>
    );
});

test('all product names should be displayed', () => {
    ITEMS.forEach((item) => {
        expect(screen.getByText(item.product)).toBeInTheDocument();
    });
});
