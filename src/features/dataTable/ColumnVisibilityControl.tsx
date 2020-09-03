import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { types } from './reducer'

export interface ColumnVisibilityControlProps {
    columns: Map<types.Columns, string>;
    visible: Array<types.Columns>;
    onClick: (id: types.Columns) => void;
}

export default function ColumnVisibilityControlProps({
    columns,
    visible,
    onClick,
}: ColumnVisibilityControlProps) {
    const checkboxProps = useMemo(
        () => createCheckboxProps(columns, visible, onClick), 
        [columns, visible, onClick]
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
    columns: Map<types.Columns, string>, 
    visible: Array<types.Columns>, 
    onClick: (id: types.Columns) => void
): Array<CheckboxProps> {
    const visibleSet = new Set<string>(visible);
    let propList = new Array<CheckboxProps>();

    columns.forEach((title, id) => {
        propList.push({
            key: id,
            onClick: () => onClick(id as types.Columns),
            checked: visibleSet.has(id),
            label: title,
        });
    });
    
    return propList;
}
