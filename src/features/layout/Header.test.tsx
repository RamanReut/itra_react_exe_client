import React, { ChangeEvent } from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './Header'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function dummySearchTextChange (event: ChangeEvent<HTMLInputElement>): void {}

test('header-searchInput', () => {
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

test('header-searchInput-focus', () => {
    render(
        <Header
            navbarPosition='open'
            onNavbarButtonClick={() => {}}
            searchText=''
            onSearchTextChange={dummySearchTextChange}
        ></Header>
    );
    
    expect(screen.getByRole('searchbox')).not.toHaveFocus();
    screen.getByRole('searchbox').focus();
    expect(screen.getByRole('searchbox')).toHaveFocus();
});

test('header-responsive-md', () => {
    const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'md' } } });

    render(
        <ThemeProvider theme={theme}>
            <Header
                navbarPosition='open'
                onNavbarButtonClick={() => {}}
                searchText=''
                onSearchTextChange={dummySearchTextChange}
            ></Header>
        </ThemeProvider>
    );

    expect(screen.getByTestId('header-path')).toBeInTheDocument();
});

test('header-responsive-xs', () => {
    const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'xs'} } });
    render (
        <ThemeProvider theme={theme}>
            <Header
                navbarPosition='open'
                onNavbarButtonClick={() => {}}
                searchText=''
                onSearchTextChange={dummySearchTextChange}
            ></Header>
        </ThemeProvider>
    );

    expect(screen.queryByTestId('header-path')).not.toBeInTheDocument();
});