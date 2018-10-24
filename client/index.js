import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
import '../public/index.css';

import store from './store';
// import Root from './components/root';

render(
  <Provider store={store}>
    {/* <Router>
       <Root />
     </Router> */}
  </Provider>,
  document.getElementById('app')
);
