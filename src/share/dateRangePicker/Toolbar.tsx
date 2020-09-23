import React, { useCallback } from 'react'
import { ToolbarComponentProps } from '@material-ui/pickers/Picker/Picker';
import {
    Box,
    Theme,
    makeStyles,
    Button,
    Typography,
} from '@material-ui/core'
import { DateRange } from './types'
import classnames from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
    },
    button: {
        color: theme.palette.primary.contrastText,
        display: 'block',
    },
    buttonYear: {
        fontSize: '1.5em',
    },
    buttonMonth: {
        textTransform: 'capitalize',
        padding: '1em 0'
    },
}));

export interface ToolbarProps extends ToolbarComponentProps {
    range: DateRange,
}

export default function Toolbar({
    date,
    setOpenView,
}: ToolbarComponentProps) {
    const classes = useStyles();

    const handleYearClick = useCallback(() => {
        setOpenView('year');
    }, [setOpenView]);
    const handleMonthClick = useCallback(() => {
        setOpenView('month');
    }, [setOpenView]);

    return (
        <Box className={classes.root}>
            <Button
                className={classnames(classes.button, classes.buttonYear)}
                onClick={handleYearClick}
                fullWidth
            >
                {date?.year}
            </Button>
            <Button
                className={classnames(classes.button, classes.buttonMonth)}
                onClick={handleMonthClick}
                fullWidth
            >
                <Typography variant='h4'>
                    {date?.monthLong}
                </Typography>
            </Button>
        </Box>
    );
}
