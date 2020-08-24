import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitForElement } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../store'
import { columnsLocalizations } from './DataTable'
import DataTableContainer from './DataTableContainer'
import { actions, DataTableSelector } from './reducer'

const defaultData = [
    {
        order_id: 1,
        order_status: 2,
        order_date: '2010-5-6',
        required_date: '2010-5-9',
        shipped_date: '2010-5-10',
        manager_name: 'gallant man',
        customer_name: 'intersting client',
        email: 'some@mail.em',
        address: 'address',
    }, {
        order_id: 2,
        order_status: 3,
        order_date: '2010-5-7',
        required_date: '2010-5-8',
        shipped_date: '2010-5-11',
        manager_name: 'major dude',
        customer_name: 'some buyer',
        email: 'another@mail.em',
        address: 'address2',
    },
]

const server = setupServer(
    rest.get('/api/orders', (req, resp, ctx) => {
        return resp(ctx.json({ orders: defaultData}));
    })
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    store.dispatch(actions.reset());
});
afterAll(() => server.close());

function Component() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <DataTableContainer></DataTableContainer>
            </BrowserRouter>
        </Provider>
    );
}

function waitManagerName(rerender: any) {
    return waitForElement(() => {
        rerender(<Component></Component>);
        return screen.getAllByText(
            (content: string, element: Element) => {
                for (let dataSet of defaultData) {
                    if (content === dataSet.manager_name) {
                        return true;
                    }
                }
                return false;
        });
    });
}

test('dataTable-DataTableContainer', async () => {
    const { rerender } = render(<Component></Component>);

    await waitManagerName(rerender);
});

test('dataTable-DataTableContainer-columnsVisibility', async () => {
    const { rerender } = render(<Component></Component>);
    const createSelector = () => new DataTableSelector(store.getState());

    await waitManagerName(rerender);
    const emailButton = () => screen.getByRole((role: string, element: Element) => {
        if (role === 'button') {
            return element.className.includes('MuiChip') && 
                element.firstChild?.textContent === columnsLocalizations.get('email');
        }
        return false;
    });
    userEvent.click(emailButton());
    rerender(<Component></Component>);
    let selector = createSelector();
    expect(selector.visibleColumns).toContain('email');
    expect(screen.getByRole('columnheader', { name: columnsLocalizations.get('email') }))
        .toBeInTheDocument();
    expect(screen.getByText(defaultData[0].email)).toBeInTheDocument();
    
    userEvent.click(emailButton());
    rerender(<Component></Component>);
    selector = createSelector();
    expect(selector.visibleColumns).not.toContain('email');
    expect(screen.queryByRole('columnheader', { name: columnsLocalizations.get('email') }))
        .not.toBeInTheDocument();
    expect(screen.queryByText(defaultData[0].email)).not.toBeInTheDocument();
})