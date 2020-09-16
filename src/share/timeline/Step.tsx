import React, { useState, useCallback, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import classnames from 'classnames'
import Grid from '@material-ui/core/Grid'
import { Color } from './types'
import { colorPicker } from './colorPicker'

const ANIMATION_PAUSE_DIVIDER = 6;

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
        transitionDuration: `${theme.transitions.duration.standard}ms`,
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
        width: 'calc(100% - 3.5rem)',
    },
    labelWrapperExpandAnimation: {
        animationName: '$labelWrapperExpand',
        animationDuration: `${theme.transitions.duration.standard}ms`,
        animationTimingFunction: theme.transitions.easing.easeIn,
        animationPlayState: 'running',
    },
    animationPaused: {
        animationPlayState: 'paused',
    },
    '@keyframes labelWrapperExpand': {
        from: {
            flex: 1,
        },
        to: {
            flex: 'none',
        },
    },
    contentWrapper: {
        margin: '0.3rem'
    },
    labelText: {
        color: ({ color }: StyleProps) => colorPicker(theme, color),
    },
    statusWrapper: {
        marginLeft: theme.spacing(),
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
    content: React.ReactElement;
    color?: Color;
}

export default function Step({
    label,
    icon,
    status,
    content,
    isActive,
    onClick,
    color,
}: StepProps) {
    const classes = useStyles({ color });
    const theme = useTheme();

    const [isAnimationCanPlayed, setIsAnimationCanPlayed] =
        useState<boolean>();
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const [isAnimationPaused, setIsAnimationPaused] =
        useState<boolean>(false);

    const handleAnimationEnd = useCallback(
        () => {
            setIsAnimationCanPlayed(false);
        },
        [setIsAnimationCanPlayed],
    );

    const handleAnimationDelay = useCallback(
        () => {
            setIsAnimationPaused(true);
            setTimeout(
                () => {
                    setIsAnimationPaused(false);
                },
                theme.transitions.duration.standard / ANIMATION_PAUSE_DIVIDER,
            );
        },
        [theme, setIsAnimationPaused],
    );

    useEffect(() => {
        if (isFirstRender) {
            setIsAnimationCanPlayed(false);
            setIsFirstRender(false);
        } else {
            setIsAnimationCanPlayed(true);
            handleAnimationDelay();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, setIsAnimationCanPlayed, setIsFirstRender, handleAnimationDelay]);

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
                        onClick={onClick}
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
            <Grid
                className={
                    classnames(
                        classes.labelWrapper,
                    )
                }
                container
                alignItems='center'
                spacing={2}
                justify={isActive ? 'space-between' : 'flex-start'}
            >
                <Grid item>
                    {label}
                </Grid>
                <Grid
                    item
                    className={
                        classnames(
                            {
                                [classes.labelWrapperExpandAnimation]:
                                    isActive && isAnimationCanPlayed,
                            }, {
                            [classes.animationPaused]: isAnimationPaused,
                        },
                        )
                    }
                    onAnimationEnd={handleAnimationEnd}
                >
                    {status}
                </Grid>
            </Grid>
        </Box>
    );
}
