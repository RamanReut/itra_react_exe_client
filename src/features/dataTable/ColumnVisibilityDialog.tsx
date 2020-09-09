import React, { useState, useEffect, useCallback } from 'react'
import ControlColumnVisibility from './ColumnVisibilityControl'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { types, actions, selectors } from './reducer'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch, batch } from 'react-redux'

export default function ColumnVisibilityDialog() {
    const dispatch = useDispatch();

    const isOpen = useSelector(selectors.isControlColumnsOpen);
    const visibleColumns = useSelector(selectors.visibleColumns);

    const  [ checkedColumns, setCheckedColumns ] = useState<Array<types.Columns>>([]);

    const handleClose = useCallback(() => {
        dispatch(actions.closeVisibleColumnsDialog());
    }, [dispatch]);
    const handleVisibleColumnsChange = useCallback(
        (visibleColumns: Array<types.Columns>) => {
            dispatch(actions.updateVisibleColumns(visibleColumns));
        }, 
        [dispatch],
    );
    const handleClick = useCallback((column: types.Columns) => {
        const index = checkedColumns.indexOf(column);

        if (index === -1) {
            setCheckedColumns([
                ...checkedColumns, 
                column
            ]);
        } else {
            setCheckedColumns([
                ...checkedColumns.slice(0, index), 
                ...checkedColumns.slice(index+1),
            ]);
        }
    }, [checkedColumns]);
    const handleOk = useCallback(() => {
        batch(() => {
            handleVisibleColumnsChange(checkedColumns);
            handleClose();
        });
    }, [checkedColumns, handleVisibleColumnsChange, handleClose]);

    useEffect(() => {
        setCheckedColumns(visibleColumns);
    }, [visibleColumns])

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
