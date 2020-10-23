import React, { useCallback } from 'react'
import Box from '@material-ui/core/Box'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import ContentWrapper from './ContentWrapper'
import { useTranslation } from 'react-i18next'

export default function Language() {
    const { t, i18n } = useTranslation('settings');
    const language = (/([a-z]{2,3})/.exec(i18n.language) as Array<string>)[1];

    const handleChange = useCallback((e) => {
        i18n.changeLanguage(e.target.value);
    }, [i18n]);

    return (
        <Box>
            <FormControl fullWidth>
                <ContentWrapper title={t('language')}>
                    <Select
                        value={language}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value='en'>English</MenuItem>
                        <MenuItem value='ru'>Русский</MenuItem>
                    </Select>
                </ContentWrapper>
            </FormControl>
        </Box>
    );
}
