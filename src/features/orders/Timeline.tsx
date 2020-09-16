import React, { useCallback } from 'react'
import { Timeline as TimelineComponent } from '../../share/timeline'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import SendIcon from '@material-ui/icons/Send'
import Icon from '@material-ui/core/Icon'
import DoneIcon from '@material-ui/icons/Done'
import { useSelector, useDispatch } from 'react-redux'
import { timelineSelector, actions } from './reducer'

export default function Timeline() {
    const dispatch = useDispatch();

    const activeStep = useSelector(timelineSelector.activeStep);

    const handleStepChange = useCallback(
        (id: number) => {
            dispatch(actions.timeline.changeActiveStep(id));
        },
        [dispatch],
    );

    return (
        <TimelineComponent
            steps={[
                {
                    label: 'Step 1',
                    icon: <LocalShippingIcon></LocalShippingIcon>,
                    content: (
                        <div>Hello</div>
                    ),
                    status: <Done></Done>
                }, {
                    label: 'Step 2',
                    icon: <SendIcon></SendIcon>,
                    content: (
                        <div>Wtf?</div>
                    ),
                    status: <Done></Done>
                }
            ]}
            activeStep={activeStep}
            onStepChange={handleStepChange}
        ></TimelineComponent>
    );
}

function Done() {
    return (
        <Icon>
            <DoneIcon></DoneIcon>
        </Icon>
    );
}
