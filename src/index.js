import React from 'react';
import './index.css';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import createFigure from './reducers/store'
import App from './App'

let store = createStore(createFigure);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);