import React, { useCallback } from 'react'
import ControlColumnVisibility from './ColumnVisibilityControl'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { types, actions, visibleColumnsSelector } from './reducer'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch, batch } from 'react-redux'

export default function ColumnVisibilityDialog() {
    const dispatch = useDispatch();

    const isOpen = useSelector(visibleColumnsSelector.isOpen);
    const checkedColumns = useSelector(visibleColumnsSelector.checkedColumns);

    const handleClose = useCallback(() => {
        dispatch(actions.visibleColumns.close());
    }, [dispatch]);
    const handleClick = useCallback((column: types.Columns) => {
        dispatch(actions.visibleColumns.toggleCheck(column));
    }, [dispatch]);
    const handleOk = useCallback(() => {
        batch(() => {
            dispatch(actions.ordersTable.updateVisibleColumns(checkedColumns));
            handleClose();
        });
    }, [dispatch, checkedColumns, handleClose]);

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
