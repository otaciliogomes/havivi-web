import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';



function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
        </BrowserRouter>
    );
}

export { Routes };