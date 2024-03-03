import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Dataprovider } from './components/Dataprovider/Dataprovider';
import {reducer,initialState} from'./Utility/reducer'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Dataprovider reducer={reducer} initialState={initialState}>
    <App />
    </Dataprovider>
  </React.StrictMode>
);


