import React, { useCallback } from 'react'
import Dialog from './ColumnVisibilityDialog'
import Box from '@material-ui/core/Box'
import { actions, ordersTableSelectors } from './reducer'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import ColumnIcon from '@material-ui/icons/ViewColumn'

export default function ColumnVisibillity() {
    const dispatch = useDispatch();
    const visibleColumns = useSelector(ordersTableSelectors.visibleColumns);

    const handleButtonClick = useCallback(() => {
        dispatch(actions.visibleColumns.open(visibleColumns));
    }, [dispatch, visibleColumns]);

    return (
        <Box>
            <IconButton onClick={handleButtonClick}>
                <ColumnIcon></ColumnIcon>
            </IconButton>
            <Dialog></Dialog>
        </Box>
    );
}
