import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Layout from './Layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { store } from '../store'
import { actions, HeaderSelector } from './reducer'
import { createThemeWithInitialWidth } from '../../share/testTools'
import userEvent from '@testing-library/user-event'

test('layout', () => {
    const theme = createThemeWithInitialWidth('xs');
    const Component = () => (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Layout></Layout>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
    const { rerender } = render(<Component></Component>);
    rerender(<Component></Component>);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect((new HeaderSelector(store.getState())).navbarPosition).toEqual('hide');

    userEvent.click(screen.getByRole('button'));
    rerender(<Component></Component>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect((new HeaderSelector(store.getState())).navbarPosition).toEqual('open');

    store.dispatch(actions.navbar.reset());
    store.dispatch(actions.header.reset());
});