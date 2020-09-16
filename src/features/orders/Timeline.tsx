import React from 'react'
import { Timeline as TimelineComponent } from '../../share/timeline'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import SendIcon from '@material-ui/icons/Send'
import Icon from '@material-ui/core/Icon'
import DoneIcon from '@material-ui/icons/Done'

export default function Timeline() {
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
            activeStep={0}
            onStepChange={(id) => { }}
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
