import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'

export interface ControlColumnVisibilityProps {
    columns: Map<string, string>;
    visible: Array<string>;
    onClick: (id: string) => void;
}

export default function ControlColumnVisibility({
    columns,
    visible,
    onClick,
}: ControlColumnVisibilityProps) {
    const chipProps = useMemo(() => createChipProps(columns, visible, onClick), [columns, visible, onClick]);

    return (
        <Grid 
            container
            spacing={2}
            justify='center'
        >
            {chipProps.map(
                (props) => {
                    const {key, ...rest} = props;
                    return (
                        <Grid 
                            item 
                            key={key}
                        >
                            <Chip {...rest}></Chip>
                        </Grid>
                    );
                }
            )}
        </Grid>
    );
}

interface ChipProps {
    key: string;
    onClick: () => void;
    color: 'primary' | 'default';
    label: string,
}

function createChipProps(
    columns: Map<string, string>, 
    visible: Array<string>, 
    onClick: (id: string) => void
): Array<ChipProps> {
    const visibleSet = new Set<string>(visible);
    let propList = new Array<ChipProps>();

    columns.forEach((title, id) => {
        propList.push({
            key: id,
            onClick: () => onClick(id),
            color: visibleSet.has(id) ? 'primary' : 'default',
            label: title,
        });
    });

    return propList;
}