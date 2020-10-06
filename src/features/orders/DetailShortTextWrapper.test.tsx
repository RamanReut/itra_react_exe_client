import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import TextWrapper from './DetailShortTextWrapper'
import Grid from '@material-ui/core/Grid'

const TITLE = 'some title';
const TEXT = 'intersting text';

beforeEach(() => {
    render(
        <Grid container>
            <TextWrapper title={TITLE}>{TEXT}</TextWrapper>
        </Grid>
    );
});

test('title should be in document', () => {
   expect(screen.getByText(TITLE)).toBeInTheDocument();
});

test('text should be in document', () => {
    expect(screen.getByText(TEXT)).toBeInTheDocument();
});
