import React, { useEffect, useCallback } from 'react'
import ControlColumnVisibility from './ColumnVisibilityControl'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { types, actions, selectors } from './reducer'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'

export default function ColumnVisibilityDialog() {
    const dispatch = useDispatch();

    const isOpen = useSelector(selectors.isControlColumnsOpen);
    const checkedColumns = useSelector(selectors.checkedColumns);

    const handleClose = useCallback(() => {
        dispatch(actions.closeVisibleColumnsDialog());
    }, [dispatch]);
    const handleClick = useCallback((column: types.Columns) => {
        dispatch(actions.checkColumns(column));
    }, [dispatch]);
    const handleOk = useCallback(() => {
        dispatch(actions.applyVisibleColumns());
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.initCheckedColumns());
    }, [dispatch]);

    return ( 
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>Visible Columns</DialogTitle>
            <DialogContent>
                <ControlColumnVisibility
                    visibleColumns={checkedColumns}
                    onClick={handleClick}
                ></ControlColumnVisibility>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleOk}
                    color='primary'
                >
                    Ok
                </Button>
                <Button 
                    onClick={handleClose}
                    color='primary'
                >
                    Cancel
                </Button>                
            </DialogActions>
        </Dialog> 
    );
}
