import React from 'react'
import Box from '@material-ui/core/Box'
import Step, { StepContentProps } from './Step'
import Connector from './Connector'
import { Color } from './types'

export interface TimelineProps {
    steps: StepContentProps[];
    activeStep: number;
    onStepChange: (step: number) => void;
    color?: Color;
}

export default function Timeline({
    steps,
    activeStep,
    onStepChange,
    color = 'primary',
}: TimelineProps) {
    return (
        <Box>
            {steps.map((stepProps, index, steps) => {
                const pickedColor = stepProps.color || color;

                return (
                    <Box key={stepProps.label}>
                        <Step
                            {...stepProps}
                            color={pickedColor}
                            onClick={() => onStepChange(index)}
                            isActive={activeStep === index}
                        ></Step>
                        {
                            index + 1 !== steps.length ?
                                <Connector color={pickedColor}></Connector> :
                                <div></div>
                        }
                    </Box>
                );
            })}
        </Box>
    );
}
