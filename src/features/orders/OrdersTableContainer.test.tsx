import 'jest-environment-jsdom-sixteen'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitForElement, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest, ResponseResolver, MockedRequest, restContext } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../store'
import { columnsLocalizations } from './OrdersTable'
import OrdersTableContainer from './OrdersTableContainer'
import { actions, OrdersTableSelector } from './reducer'

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

let requestSpy = jest.fn(() => {});

const server = setupServer(
    rest.get('/api/orders', (req, resp, ctx) => {
        requestSpy();
        return resp(ctx.json({ orders: defaultData }));
    }),
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    store.dispatch(actions.ordersTable.reset());
    requestSpy = jest.fn(() => {});
});
afterAll(() => server.close());

function Component() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <OrdersTableContainer></OrdersTableContainer>
            </BrowserRouter>
        </Provider>
    );
}

test('component should get data from api', async () => {
    render(<Component></Component>);

    await waitFor(() => expect(requestSpy).toHaveBeenCalled());
})

test('information should display in table', async () => {
    const { rerender } = render(<Component></Component>);

    await waitFor(() => expect(requestSpy).toBeCalled());
    rerender(<Component></Component>);
    expect(getAllRowWithData()).toHaveLength(2)
})

function getAllRowWithData() {
    return screen.getAllByRole('row', { name: (name: string) => {
        return name.includes('major dude') || name.includes('gallant man');
    }});
}
