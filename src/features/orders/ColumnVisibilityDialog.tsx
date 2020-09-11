import React, { useEffect, useCallback } from 'react'
import ControlColumnVisibility from './ColumnVisibilityControl'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { types, actions, ordersTableSelectors } from './reducer'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'

export default function ColumnVisibilityDialog() {
    const dispatch = useDispatch();

    const isOpen = useSelector(ordersTableSelectors.isControlColumnsOpen);
    const checkedColumns = useSelector(ordersTableSelectors.checkedColumns);

    const handleClose = useCallback(() => {
        dispatch(actions.ordersTable.closeVisibleColumnsDialog());
    }, [dispatch]);
    const handleClick = useCallback((column: types.Columns) => {
        dispatch(actions.ordersTable.checkColumns(column));
    }, [dispatch]);
    const handleOk = useCallback(() => {
        dispatch(actions.ordersTable.applyVisibleColumns());
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.ordersTable.initCheckedColumns());
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
