import React, { useState, useEffect } from 'react'
import { types } from './reducer'
import { Column } from 'material-table'
import { DateRangePicker, DateRange } from '../../share/dateRangePicker'

export interface OrderDateFilterProps {
    columnDef: Column<types.Row>;
    onFilterChanged: (rowId: string, value: any) => void;
}

interface FieldId {
    tableData: {
        id: number;
    }
}

export default function OrderDateFilter({
    columnDef,
    onFilterChanged,
}: OrderDateFilterProps) {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    useEffect(() => {
        if (columnDef.field) {
            onFilterChanged(`${(columnDef as FieldId).tableData.id}`, range);
        }
    }, [columnDef, onFilterChanged, range])

    return (
        <DateRangePicker
            range={range}
            onRangeChange={setRange}
        ></DateRangePicker>
    );
}
