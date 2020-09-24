import React, { useState } from 'react'
import { types } from './reducer'
import { Column } from 'material-table'
import { DateRangePicker, DateRange } from '../../share/dateRangePicker'

export interface OrderDateFilterProps {
    columnDef: Column<types.Row>;
    onFilterChanged: (rowId: string, value: any) => void
}

export default function OrderDateFilter({
    columnDef,
    onFilterChanged,
}: OrderDateFilterProps) {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
        <DateRangePicker
            range={range}
            onRangeChange={setRange}
        ></DateRangePicker>
    );
}
