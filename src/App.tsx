import React, { Suspense } from 'react';
import './App.css';
import { Layout } from './features/layout';
import { Orders } from './features/orders';
import { makeStyles, Theme } from '@material-ui/core/styles'
import classnames from 'classnames'
import { Switch, Route } from 'react-router-dom'
import { NotFound } from './features/notFound'
import { Settings } from './features/settings'
import { ThemeProvider } from '@material-ui/core/styles'
import { themeSelector, lightTheme, darkTheme } from './features/theme'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
    }
}));


function App() {
    const classes = useStyles();
    const themeType = useSelector(themeSelector);

    const theme = themeType === 'dark' ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <div className={classnames('App', classes.root)}>
                <Suspense fallback='loading...'>
                    <Layout>
                        <Switch>
                            <Route path='/data'>
                                <Orders></Orders>
                            </Route>
                            <Route path='/settings'>
                                <Settings></Settings>
                            </Route>
                            <Route path='*'>
                                <NotFound></NotFound>
                            </Route>
                        </Switch>
                    </Layout> 
                </Suspense>     
            </div>
        </ThemeProvider>
  );
}

export default App;
