import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App /> 
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
