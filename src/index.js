import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import './css/style.css';
import Home from './components/Home';
import Movie from './components/Movie';
import registerServiceWorker from './registerServiceWorker';
const store = configureStore();
ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/movies/:id' component={Movie} />
        </div>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
