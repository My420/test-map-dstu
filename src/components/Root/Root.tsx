import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import App from '../App';
import 'antd/dist/antd.css';

const Root: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
