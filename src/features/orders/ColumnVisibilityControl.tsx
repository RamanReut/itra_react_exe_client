import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { types } from './reducer'
import { useTranslation } from 'react-i18next'

export interface ColumnVisibilityControlProps {
    visibleColumns: Array<types.Columns>;
    onClick: (id: types.Columns) => void;
}

export default function ColumnVisibilityControlProps({
    visibleColumns,
    onClick,
}: ColumnVisibilityControlProps) {
    const { t } = useTranslation('orders');
    const columnNames: Record<string, string> =
        t('columns', { returnObjects: true })
    const checkboxProps = useMemo(
        () => createCheckboxProps(columnNames, visibleColumns, onClick),
        [visibleColumns, onClick, columnNames]
    );

    return (
        <FormControl>
            <Grid 
                container
                spacing={2}
                justify='flex-start'
            >
                {checkboxProps.map(
                    (props) => {
                        const {key, label, ...rest} = props;

                        return (
                            <Grid 
                                item 
                                key={key}
                                sm={6}
                                xs={12}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            color='primary'
                                            {...rest}
                                        ></Checkbox>}
                                    label={label}
                                ></FormControlLabel>
                            </Grid>
                        );
                    }
                )}
            </Grid>
        </FormControl>
    );
}

interface CheckboxProps {
    key: string;
    onClick: () => void;
    checked: boolean,
    label: string,
}

function createCheckboxProps(
    columns: Record<string, string>, 
    visible: Array<types.Columns>, 
    onClick: (id: types.Columns) => void
): Array<CheckboxProps> {
    const visibleSet = new Set<string>(visible);
    let propList = new Array<CheckboxProps>();

    for (let columnId in columns) {
        const column = columnId as types.Columns;
        propList.push({
            key: column,
            onClick: () => onClick(column),
            checked: visibleSet.has(column),
            label: columns[column],
        });
    }
    
    return propList;
}
