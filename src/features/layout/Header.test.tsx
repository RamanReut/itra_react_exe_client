import React, { ChangeEvent } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './Header'

test('text in search input should change after user input', () => {
    let searchText = 'search this'
    const onSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        searchText = event.currentTarget.value;
    }

    render(
        <Header
            navbarPosition='open'
            onNavbarButtonClick={() => {}}
            searchText={searchText}
            onSearchTextChange={onSearchTextChange}
        ></Header>
    );

    expect(screen.getByDisplayValue(searchText)).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue(searchText), {
        target: { value: 'hi' }
    });
    expect(searchText).toEqual('hi');
});
