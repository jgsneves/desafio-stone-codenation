import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Reports from './pages/reports/Reports';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact/>
            <Route component={Reports} path='/reports'/>
        </BrowserRouter>
    );
}

export default Routes;