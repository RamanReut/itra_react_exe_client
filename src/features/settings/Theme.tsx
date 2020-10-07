import React, { useCallback } from 'react'
import ContentWrapper from './ContentWrapper'
import { actions, ThemeName, themeSelector } from '../theme'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default function Theme() {
    const dispatch = useDispatch();
    const { t } = useTranslation('settings');

    const theme = useSelector(themeSelector);

    const handleChangeTheme = useCallback(
        (event) => {
            const theme = event.target.value as ThemeName;
            dispatch(actions.changeTheme(theme))
        },
        [dispatch],
    );
    return (
        <ContentWrapper title={t('theme.theme')}>
            <Select
                value={theme}
                onChange={handleChangeTheme}
                fullWidth
            >
                <MenuItem value='light'>
                    {t('theme.light')}
                </MenuItem>
                <MenuItem value='dark'>
                    {t('theme.dark')}
                </MenuItem>
            </Select>
        </ContentWrapper>
    );
}
