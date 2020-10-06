import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import classnames from 'classnames'
import { Color, StepState } from './types'
import { colorPicker } from './colorPicker'

interface StyleProps {
    color: Color;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
    },
    minSize: {
        maxHeight: '2rem',
        width: '2rem',
        height: '2rem',
    },
    fullSize: {
        width: '100%',
        maxHeight: '30rem',
    },
    collapse: {
        overflow: 'hidden',
    },
    mainFlow: {
        borderColor: ({ color }: StyleProps) => colorPicker(theme, color),
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: 'calc(1rem + 2px)',
        transitionDuration: `400ms`,
        transitionTimingFunction: theme.transitions.easing.easeIn,
        transitionProperty: 'width, max-height',
    },
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        color: ({ color }: StyleProps) => colorPicker(theme, color),
    },
    labelWrapper: {
        marginLeft: '1em',
        position: 'absolute',
        left: '2rem',
        top: '0em',
        zIndex: 2,
        width: 0,
        display: 'flex',
        transitionProperty: 'width',
        transitionDuration: `400ms`,
        transitionTimingFunction: theme.transitions.easing.easeIn,
        alignItems: 'center',
        height: '2rem',
    },
    labelWrapperFullWidth: {
        width: 'calc(100% - 3.5rem)',
    },
    contentWrapper: {
        margin: '0.3rem'
    },
    labelTextWrapper: {
        color: ({ color }: StyleProps) => colorPicker(theme, color),
        flexGrow: 0,
    },
    labelGrower: {
        flexGrow: 1,
    },
    labelStatusWrapper: {
        marginLeft: theme.spacing(),
        flexGrow: 0,
    },
}));

export interface StepProps extends StepContentProps {
    onClick: () => void;
    isActive: boolean;
    color: Color;
}

export interface StepContentProps {
    label: string;
    icon: React.ReactElement;
    status?: React.ReactElement;
    content?: React.ReactElement;
    color?: Color;
    state?: StepState;
}

export default function Step({
    label,
    icon,
    status,
    content,
    isActive,
    onClick,
    color,
    state = 'enable',
}: StepProps) {
    const classes = useStyles({ color });

    return (
        <Box className={classes.root}>
            <Box
                className={classnames(
                    classes.mainFlow,
                    { [classes.collapse]: !isActive },
                    { [classes.minSize]: !isActive },
                    { [classes.fullSize]: isActive },
                )}
            >
                <Box>
                    <Box
                        className={classnames(classes.iconWrapper, classes.minSize)}
                        onClick={state === 'enable' ? onClick : () => { }}
                    >
                        <Icon>
                            {icon}
                        </Icon>
                    </Box>

                </Box>
                <Box className={classes.contentWrapper}>
                    {content}
                </Box>
            </Box>
            <Box className={
                classnames(
                    classes.labelWrapper,
                    { [classes.labelWrapperFullWidth]: isActive },
                )}
            >
                <Box className={classes.labelTextWrapper}>
                    {label}
                </Box>
                <Box className={classes.labelGrower}></Box>
                <Box className={classes.labelStatusWrapper}>
                    {status}
                </Box>
            </Box>
        </Box>
    );
}
