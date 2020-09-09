import React, { useCallback } from 'react'
import Dialog from './ColumnVisibilityDialog'
import Box from '@material-ui/core/Box'
import { actions } from './reducer'
import { useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import ColumnIcon from '@material-ui/icons/ViewColumn'

export default function ColumnVisibillity() {
    const dispatch = useDispatch();

    const handleButtonClick = useCallback(() => {
        dispatch(actions.openVisibleColumnsDialog());
    }, [dispatch]);

    return (
        <Box>
            <IconButton onClick={handleButtonClick}>
                <ColumnIcon></ColumnIcon>
            </IconButton>
            <Dialog></Dialog>
        </Box>
    );
}
