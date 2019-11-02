import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose ,combineReducers} from 'redux';
import reducer from './store/reducers/auth';
import 'semantic-ui/dist/semantic.min.css';
import thunk from 'redux-thunk';
import order from './store/reducers/lists';
import authReducer from './store/reducers/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  red : reducer,
  authRed : authReducer,
  ord : order
})
const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));
window.myStore = store;
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
