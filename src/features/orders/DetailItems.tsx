import React from 'react'
import { types } from './reducer'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import DetailItemInfo from './DetailItemInfo'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export interface DetailItemsInfoProps {
    items: Array<types.OrderItem>;
}

export default function DetailItems({
    items,
}: DetailItemsInfoProps ) {
    const classes = useStyles();

    return(
        <Box className={classes.root}>
            {items.map((product: types.OrderItem, index, array) => {
                return (
                    <Box>
                        <DetailItemInfo {...product}></DetailItemInfo>
                        { array.length !== index + 1 ? <Divider></Divider> : <div></div> }
                    </Box>
                );
            })}
        </Box>
    );
}
