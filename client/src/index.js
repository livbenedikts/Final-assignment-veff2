import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
   <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
</React.StrictMode>,
);

reportWebVitals();