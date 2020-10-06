import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    item: {
        [theme.breakpoints.up('sm')]: {
            width: '75%',
            '&:hover, &:focus-within': {
                width: '100%',
            },
            transitionTimingFunction: theme.transitions.easing.easeIn,
            transitionDuration: `${theme.transitions.duration.standard}ms`,
            transitionProperty: 'width',
        },
    },
    input: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.common.white,
        },
    },
}));

export interface SearchInputProps {
    text: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
    text,
    onChange,
}: SearchInputProps ) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid 
            container
            direction='row-reverse'
            className={classes.root}
        >
            <Grid 
                item
                className={classes.item}
            >
                <TextField
                    fullWidth
                    className={classes.input}
                    data-testid='header-searchInput'
                    variant='outlined'
                    type='search'
                    color='primary'
                    size='small'
                    placeholder={t('quickSearch')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon></SearchIcon>
                            </InputAdornment>                       
                        ),
                    }}
                    value={text}
                    onChange={onChange}
                ></TextField> 
            </Grid>
        </Grid>
    );
}
