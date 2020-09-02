import React, { useState, useEffect, useCallback } from 'react'
import ControlColumnVisibility from './ColumnVisibilityControl'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { types } from './reducer'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'


export interface ColumnVisibilityPopoverProps {
    columns: Map<string, string>;
    visible: Array<types.Columns>;
    isOpen: boolean;
    onClose: () => void;
    onVisibilityChange: (visibleColumns: Array<types.Columns>) => void;
}

export default function ColumnVisibilityPopper({
    columns,
    visible,
    isOpen,
    onClose,
    onVisibilityChange,
}: ColumnVisibilityPopoverProps) {
    const  [ visibleColumns, setVisibleColumns ] = useState<Array<types.Columns>>([]);

    const handleClick = useCallback((column: types.Columns) => {
        const index = visibleColumns.indexOf(column);

        if (index === -1) {
            setVisibleColumns([
                ...visibleColumns, 
                column
            ]);
        } else {
            setVisibleColumns([
                ...visibleColumns.slice(0, index), 
                ...visibleColumns.slice(index+1),
            ]);
        }
    }, [visibleColumns]);
    const handleOk = useCallback(() => {
        onVisibilityChange(visibleColumns);
        onClose();
    }, [visibleColumns, onVisibilityChange, onClose]);

    useEffect(() => {
        setVisibleColumns(visible);
    }, [visible])

    return ( 
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>Visible Columns</DialogTitle>
            <DialogContent>
                <ControlColumnVisibility
                    columns={columns}
                    visible={visibleColumns}
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
                    onClick={onClose}
                    color='primary'
                >
                    Cancel
                </Button>                
            </DialogActions>
        </Dialog> 
    );
}
