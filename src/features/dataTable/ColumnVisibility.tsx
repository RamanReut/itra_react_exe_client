import React, { useCallback } from 'react'
import Dialog from './ColumnVisibilityDialog'
import Icon from './ColumnVisibilityIcon'
import Box from '@material-ui/core/Box'
import { types } from './reducer'

export interface ColumnVisibilityProps {
    columns: Map<types.Columns, string>,
    visible: Array<types.Columns>;
    onOpenChange: (state: boolean) => void;
    isOpen: boolean;
    onVisibilityChange: (visibleColumns: Array<types.Columns>) => void;
}

export default function ColumnVisibillity({
    columns,
    visible,
    onOpenChange,
    isOpen,
    onVisibilityChange,
}: ColumnVisibilityProps ) {

    const handleOpen = useCallback(() => {
        onOpenChange(true);
    }, [onOpenChange]);
    const handleClose = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);

    return (
        <Box>
            <Icon onClick={handleOpen}></Icon>
            <Dialog
                onClose={handleClose}
                isOpen={isOpen}
                columns={columns}
                visible={visible}
                onVisibilityChange={onVisibilityChange}
            ></Dialog>
        </Box>
    );
}
