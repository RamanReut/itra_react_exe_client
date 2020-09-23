import React, {
    useCallback,
    useState,
    useRef,
} from 'react'
import {
    DatePicker as ExtDatePicker,
} from '@material-ui/pickers'
import { DateType } from '@date-io/type'
import {
    IconButton,
    makeStyles,
    Theme,
} from '@material-ui/core'
import { DateRange } from './types'
import classnames from 'classnames'
import Toolbar from './Toolbar'

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
    const [pickDate, setPickDate] =
        useState<Date | null>(prevPickDate);
    const isPickYear = useRef<boolean>(false);
    const isPickMonth = useRef<boolean>(false);

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
        const jsDate = dateTypeToDate(date);
        if (!isPickYear.current && !isPickMonth.current) {
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
        } else {
            isPickMonth.current = false;
            isPickYear.current = false;
        }
    }, [prevPickDate, onChange, handleSameDatePick, handleDifferentPickDate]);
    const handleYearChange = useCallback((date: DateType | null) => {
        setPickDate(dateTypeToDate(date));
        isPickYear.current = true;
    }, [setPickDate]);
    const handleMonthChange = useCallback((date: DateType | null) => {
        setPickDate(dateTypeToDate(date));
        isPickMonth.current = true;
    }, [setPickDate]);

    return (
        <ExtDatePicker
            variant='static'
            value={pickDate}
            onChange={handleChange}
            renderDay={(
                day: DateType | null,
                selectedDay: DateType | null,
                dayInCurrentMonth: boolean,
            ) => {
                const date = dateTypeToDate(day);

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
            onYearChange={handleYearChange}
            onMonthChange={handleMonthChange}
            ToolbarComponent={Toolbar}
            views={['year', 'month', 'date']}
        ></ExtDatePicker >
    );
}

function dateTypeToDate(date: DateType | null): Date {
    return (date ? date.toJSDate() : null) as Date;
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
