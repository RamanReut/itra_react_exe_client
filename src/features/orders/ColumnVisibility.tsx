import React, { useCallback } from 'react'
import Dialog from './ColumnVisibilityDialog'
import Box from '@material-ui/core/Box'
import { actions, ordersTableSelectors } from './reducer'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import ColumnIcon from '@material-ui/icons/ViewColumn'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles(
    (theme: Theme) => ({
        icon: {
            color: theme.palette.text.primary,
        },
    }),
);

export default function ColumnVisibillity() {
    const dispatch = useDispatch();
    const visibleColumns = useSelector(ordersTableSelectors.visibleColumns);
    const classes = useStyles();

    const handleButtonClick = useCallback(() => {
        dispatch(actions.visibleColumns.open(visibleColumns));
    }, [dispatch, visibleColumns]);

    return (
        <Box>
            <IconButton
                className={classes.icon}
                onClick={handleButtonClick}
            >
                <ColumnIcon></ColumnIcon>
            </IconButton>
            <Dialog></Dialog>
        </Box>
    );
}
