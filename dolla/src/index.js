import React from 'react';
import ReactDOM from 'react-dom';
//import {createStore} from 'redux'
//import reducer from './store/reducer.js'
import {Provider} from 'react-redux'
import MainStore from './store/ReduxIndex.js'

import App from './App';

ReactDOM.render(<Provider store={MainStore}>
<App /></Provider>,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

