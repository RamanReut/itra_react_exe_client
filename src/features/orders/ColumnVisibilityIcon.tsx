import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ColumnIcon from '@material-ui/icons/ViewColumn'

export interface ColumnVisibilityIconProps {
    onClick: () => void;
}

export default function ColumnVisibility({
    onClick,
}: ColumnVisibilityIconProps ) {
    return (
        <IconButton onClick={onClick}>
            <ColumnIcon></ColumnIcon>
        </IconButton>
    );
}
