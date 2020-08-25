import React from 'react'
import { render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DataTable, { columnsLocalizations } from './OrdersTable'
import { types } from './reducer'
import userEvent from '@testing-library/user-event'

const defaultData: Array<types.Record> = [
    {
        order_id: 1,
        order_status: 2,
        order_date: '2010-5-6',
        required_date: '2010-5-9',
        shipped_date: '2010-5-10',
        manager_name: 'manager',
        customer_name: 'intersting client',
        email: 'some@mail.em',
        address: 'address',
        order_items: [],
    }, {
        order_id: 2,
        order_status: 3,
        order_date: '2010-5-7',
        required_date: '2010-5-8',
        shipped_date: '2010-5-11',
        manager_name: 'manager2',
        customer_name: 'some buyer',
        email: 'another@mail.em',
        address: 'address2',
        order_items: [],
    }
]
const defaultVisible: Array<types.Columns> = ['order_id', 'customer_name'];
const defaultHandleFetch = () => {};
const defaultHandleToggleVisibility = (id: string) => {};
const defaultHandleDetailOpen = (id: number) => {};
const defaultHandleDetailClose = () => {};
const defaultHandleToggleDetailExpandGroup = () => {};
const defaultHandleToggleDetailExpandProduct = () => {};

test('dataTable-DataTable', () => {
    let isFetched = false;
    const handleFetch = () => {isFetched = true};
    render(
        <DataTable
            onFetch={handleFetch}
            data={defaultData}
            visibleColumns={defaultVisible}
            onToggleVisibility={defaultHandleToggleVisibility}
            isDetailOpen={false}
            detailId={0}
            onDetailOpen={defaultHandleDetailOpen}
            onDetailClose={defaultHandleDetailClose}
            expandedDetailGroups={[]}
            onToggleDetailExpandGroup={defaultHandleToggleDetailExpandGroup}
            expandedDetailProduct={[]}
            onToggleDetailExpandProduct={defaultHandleToggleDetailExpandProduct}
        ></DataTable>
    )
    
    expect(isFetched).toBeTruthy();
    expect(screen.getAllByRole('columnheader')).toHaveLength(defaultVisible.length);
    defaultVisible.forEach((id) => {
        expect(screen.getAllByText(columnsLocalizations.get(id) as string)).toHaveLength(2);
    });
    expect(screen.getByRole('row',  {
        name: `${defaultData[0].order_id} ${defaultData[0].customer_name}`
    })).toBeInTheDocument();
    expect(screen.getByRole('row',  {
        name: `${defaultData[1].order_id} ${defaultData[1].customer_name}`
    })).toBeInTheDocument();
});

test('dataTable-DataTable-filter', async () => {
    const Component = () => (
        <DataTable
            onFetch={defaultHandleFetch}
            data={defaultData}
            visibleColumns={defaultVisible}
            onToggleVisibility={defaultHandleToggleVisibility}
            isDetailOpen={false}
            detailId={0}
            onDetailOpen={defaultHandleDetailOpen}
            onDetailClose={defaultHandleDetailClose}
            expandedDetailGroups={[]}
            onToggleDetailExpandGroup={defaultHandleToggleDetailExpandGroup}
            expandedDetailProduct={[]}
            onToggleDetailExpandProduct={defaultHandleToggleDetailExpandProduct}
        ></DataTable>
    );
    const { rerender } = render(<Component></Component>);
    userEvent.type(screen.getByRole('searchbox', {
        name: new RegExp(columnsLocalizations.get('customer_name') as string, 'g'),
    }), defaultData[1].customer_name.slice(0, 5));
    
    const regexpPattern = defaultData.reduce((accumulator, element) => {
        return `${accumulator}|(${element.order_id} ${element.customer_name})`
    }, '').slice(1);            
    const reg = new RegExp(regexpPattern, 'g');
    expect(screen.getByText(defaultData[1].customer_name)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => {
        rerender(<Component></Component>);
        return screen.queryByText(defaultData[0].customer_name);
    }).catch((err) => expect(err).toBeNull());
    expect(screen.getAllByRole('row', {
        name: (content: string, element: Element) => reg.test(content),
    })).toHaveLength(1);
});