import React from 'react';
import './App.css';
import { Layout } from './features/layout';
import { Orders } from './features/orders';
import { makeStyles, Theme } from '@material-ui/core/styles'
import classnames from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
    }
}));


function App() {
    const classes = useStyles();

    return (
        <div className={classnames('App', classes.root)}>
            <Layout>
              <Orders></Orders>
            </Layout>      
        </div>
  );
}

export default App;
