import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import TextWrapper from './DetailLongTextWrapper'
import Grid from '@material-ui/core/Grid'

const TITLE = 'intersting title';
const TEXT = 'some text';

beforeEach(() => {
    render(
        <Grid container>
            <TextWrapper title={TITLE}>{TEXT}</TextWrapper>
        </Grid>
    );
});

test('title should exist in document', () => {
    expect(screen.getByText(TITLE)).toBeInTheDocument();
});

test('text should exist in document', () => {
    expect(screen.getByText(TEXT)).toBeInTheDocument();
});
