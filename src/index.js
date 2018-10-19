import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/assets/css/custom.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'


// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app') 
);