import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import DetailItemInfo from './DetailItemInfo'

const PRODUCT_NAME = 'Unique Product';
const BRAND = 'Brand Prod';
const MODEL_YEAR = 2020;
const LIST_PRICE = 223;
const QUANTITY = 3;
const DISCOUNT = 0.07;

beforeEach(() => {
    render(
        <DetailItemInfo
            product={PRODUCT_NAME}
            brand={BRAND}
            model_year={MODEL_YEAR}
            list_price={LIST_PRICE}
            quantity={QUANTITY}
            discount={DISCOUNT}
        ></DetailItemInfo>
    );
});

test('product name should be displayed', () => {
    expect(screen.getByText(PRODUCT_NAME)).toBeInTheDocument();
});

test('brand should be dispalyed', () => {
    expect(screen.getByText(BRAND)).toBeInTheDocument();
});

test('model year should be displayed', () => {
    expect(screen.getByText(MODEL_YEAR.toString())).toBeInTheDocument();
});

test('list price should be displayed', () => {
    expect(screen.getByText(LIST_PRICE.toString())).toBeInTheDocument();
});

test('quantity should be displayed', () => {
    expect(screen.getByText(QUANTITY.toString())).toBeInTheDocument();
});

test('discount should be displayed as procent', () => {
    expect(screen.getByText(Math.trunc(DISCOUNT * 100).toString() + '%'))
        .toBeInTheDocument();
});
