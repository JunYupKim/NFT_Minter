import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from './App';
import * as serviceWorker from './serviceWorker';
import {TransactionProvider} from "./context/NFTDataHandler"; 

//import './App.css';
import './assets/scss/style.scss';
const history = createBrowserHistory();

ReactDOM.render(
  <TransactionProvider>
    <Router history={history}>
    <App />
  </Router>,
  </TransactionProvider>,
  
  document.getElementById('root')
);

serviceWorker.unregister();
