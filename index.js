// import React from 'react';
// import './index.css';
// import App from './App';
// import { AppRegistry } from 'react-native';
// //import 'bootstrap/dist/css/bootstrap.min.css';

// import { Provider } from 'react-redux';
// import { store, persistor } from "./src/redux/store";
// import { PersistGate } from "redux-persist/integration/react";


// const ReduxApp = () => (
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>
// );

// AppRegistry.registerComponent('BloodnHeartApp', () => ReduxApp);

// index.js
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('BloodnHeartApp', () => App);
