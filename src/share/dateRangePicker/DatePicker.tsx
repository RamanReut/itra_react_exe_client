import React, { useCallback, useState } from 'react'
import { DatePicker as ExtDatePicker } from '@material-ui/pickers'
import { DateType } from '@date-io/type'
import {
    IconButton,
    makeStyles,
    Theme,
} from '@material-ui/core'
import { DateRange } from './types'
import classnames from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
    day: {
        height: '36px',
        width: '36px',
        margin: '0 2px',
        fontSize: '0.9em',
        color: theme.palette.text.primary,
    },
    dayInRange: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    activeDay: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

export interface DatePickerProps {
    onChange: (range: DateRange) => void;
    range: DateRange;
}

export default function DatePicker({
    onChange,
    range,
}: DatePickerProps) {
    const classes = useStyles();
    const [prevPickDate, setPrevPickDate] =
        useState<Date | null>(range.start || range.end);

    const handleSameDatePick = useCallback((date: Date) => {
        if (range.start && range.end) {
            return { start: null, end: date };
        }
        if (range.start) {
            return { start: date, end: date };
        }
        return { start: date, end: null };
    }, [range]);
    const handleDifferentPickDate = useCallback((date: Date) => {
        if (prevPickDate) {
            if (date > prevPickDate) {
                return { start: prevPickDate, end: date };
            } else {
                return { start: date, end: prevPickDate };
            }
        }
        return { start: date, end: null };
    }, [prevPickDate]);
    const handleChange = useCallback((date: DateType | null) => {
        const jsDate = (date ? date.toJSDate() : null) as Date;
        let newRange: DateRange;

        /* Normalize date */
        jsDate.setHours(0);
        jsDate.setMinutes(0);
        jsDate.setSeconds(0);

        if (jsDate.getTime() === prevPickDate?.getTime()) {
            newRange = handleSameDatePick(jsDate);
        } else {
            newRange = handleDifferentPickDate(jsDate);
        }
        setPrevPickDate(jsDate);
        onChange(newRange);
    }, [prevPickDate, onChange, handleSameDatePick, handleDifferentPickDate]);

    return (
        <ExtDatePicker
            variant='static'
            value={null}
            onChange={handleChange}
            renderDay={(
                day: DateType | null,
                selectedDay: DateType | null,
                dayInCurrentMonth: boolean,
            ) => {
                const date = (day ? day.toJSDate() : null) as Date;

                return (
                    <IconButton
                        size='small'
                        className={classnames(
                            classes.day,
                            { [classes.dayInRange]: isBetween(range, date) },
                            {
                                [classes.activeDay]:
                                    date.getTime() === range.start?.getTime() ||
                                    date.getTime() === range.end?.getTime()
                            },
                        )}
                        disabled={!dayInCurrentMonth}
                    >
                        {(day as DateType).day}
                    </IconButton>
                );
            }}
        ></ExtDatePicker >
    );
}

function isBetween(range: DateRange, date: Date | null): boolean {
    if (range && date) {
        if (range.start && range.end) {
            return range.start < date && range.end > date;
        }
        if (range.start) {
            return range.start < date;
        }
        if (range.end) {
            return range.end > date;
        }
    }
    return false;
}
