import React, {
    useState,
    useCallback,
} from 'react'
import {
    Input,
    Box,
} from '@material-ui/core'
import DateRangePickerDialog from './DateRangePickerDialog'
import { DateRange } from './types'
import { DateTime } from 'luxon'

export interface DateRangePickerProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    range: DateRange;
    onRangeChange: (range: DateRange) => void;
}

export default function DateRangePicker({
    range,
    onRangeChange,
}: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);
    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <Box>
            <Input
                onClick={handleOpen}
                readOnly={true}
                value={`${dateToString(range.start)} - ${dateToString(range.end)}`}
            ></Input>
            { isOpen ?
                <DateRangePickerDialog
                    onClose={handleClose}
                    range={range}
                    onRangeChange={onRangeChange}
                ></DateRangePickerDialog> :
                <div></div>
            }
        </Box>
    );
}

function dateToString(date: Date | null) {
    if (date) {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_SHORT);
    }
    return '';
}
