import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// React redux with thunk
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';

// Components
import Router from './Router';
import './index.css';

// Initialize react redux with thunk
const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(middleware)


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
