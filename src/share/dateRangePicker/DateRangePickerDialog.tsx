import React, { useState, useCallback } from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    Grid,
    Button,
    makeStyles,
    Theme,
} from '@material-ui/core'
import { DateRange } from './types'
import DatePicker from './DatePicker'

const useStyles = makeStyles((theme: Theme) => ({
    actionsWrapper: {
        marginLeft: '26px',
        marginRight: '14px',
    },
}));

export interface DateRangePickerDialogProps {
    onClose: () => void;
    range: DateRange;
    onRangeChange: (range: DateRange) => void;
}

export default function DateRangePickerDialog({
    range,
    onClose,
    onRangeChange,
}: DateRangePickerDialogProps) {
    const classes = useStyles();

    const [startDate, setStartDate] = useState<Date | null>(range.start);
    const [endDate, setEndDate] = useState<Date | null>(range.end);

    const handleOk = useCallback(() => {
        onRangeChange({ start: startDate, end: endDate });
        onClose();
    }, [onRangeChange, onClose, startDate, endDate]);
    const handleClear = useCallback(() => {
        setStartDate(null);
        setEndDate(null);
    }, [setStartDate, setEndDate]);
    const handlePickerRangeChange = useCallback((range: DateRange) => {
        setStartDate(range.start);
        setEndDate(range.end);
    }, [setStartDate, setEndDate])

    return (
        <Dialog
            open={true}
            onClose={onClose}
            maxWidth='lg'
        >
            <DialogContent>
                <DatePicker
                    onChange={handlePickerRangeChange}
                    range={{ start: startDate, end: endDate }}
                ></DatePicker>
            </DialogContent>
            <DialogActions className={classes.actionsWrapper}>
                <Grid
                    container
                    justify='space-between'
                >
                    <Grid item>
                        <Button
                            color='primary'
                            onClick={handleClear}
                        >Clear</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color='primary'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            color='primary'
                            onClick={handleOk}
                        >Ok</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog >
    );
}
