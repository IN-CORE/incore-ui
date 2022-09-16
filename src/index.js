// Set up your application entry point here...
///* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import configureStore from './store/configureStore';
import { UserStateActionDispatcherContext, UserStateContext } from './store/contexts';
import { userReducer } from './reducers/userReducer';
import { userStateInitialValue } from './store/states';

import './styles/styles.scss';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const App = () => {
	const [userState, userActionDispatcher] = React.useReducer(userReducer, userStateInitialValue);

	return (
		<Provider store={store}>
			<UserStateActionDispatcherContext.Provider value={userActionDispatcher}>
				<UserStateContext.Provider value={userState}>
					<Router history={history} routes={routes} />
				</UserStateContext.Provider>
			</UserStateActionDispatcherContext.Provider>
		</Provider>
	);
};

render(<App />, document.getElementById('app'));
