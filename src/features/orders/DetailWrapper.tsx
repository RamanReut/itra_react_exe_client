import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, fade, Theme } from '@material-ui/core/styles'
import classnames from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        borderBottom: '1px inset',
        '&$expanded': {
            margin: '0px',
        }
    },
    expanded: {},
    second: {
        backgroundColor: fade(theme.palette.common.black, 0.1),
    }
}));

export interface DetailWrapperProps {
    children: React.ReactNode;
    isExpand?: boolean;
    title: string;
    onChange?: () => void;
    variant?: 'first' | 'second'
}

export default function DetailWrapper({
    children,
    isExpand,
    title,
    onChange,
    variant = 'first',
}: DetailWrapperProps) {
    const classes = useStyles();

    return (
        <Accordion
            classes={{root: classes.root, expanded: classes.expanded}}
            expanded={isExpand}
            onChange={onChange}
        >
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                className={classnames({ [classes.second]: variant == 'second' })}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}