import React, { useEffect } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from './NavbarList'
import { types } from './reducer'

export interface NavbarDrawerProps {
    position: types.NavbarPosition,
    onClose: () => void,
}

export default function NavbarDrawer({ position, onClose }: NavbarDrawerProps) {
    useEffect(() => {
        onClose();
    }, [onClose])

    return (
        <Drawer 
            data-testid='navbar-drawer'
            anchor='left' 
            open={position === 'open'}
            onClose={onClose}
        >
            <List></List>
        </Drawer>
    );
}