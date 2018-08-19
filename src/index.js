import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux';
import { history, store } from './redux/store';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

if(sessionStorage.Auth) {
    store.dispatch({type: 'SET_USER', user: JSON.parse(sessionStorage.Auth)});
}

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();