import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Mesas } from './pages/Mesa';

import { Products } from './pages/Produto';
import { ProductsForm } from './pages/Produto/Form';



function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/mesas" component={Mesas} />
            <Route path="/produtos" component={Products} />
            <Route path="/produtos_cadastro" component={ ProductsForm} />
            <Route path="/produtos_cadastro/:id" component={ ProductsForm} />
        </BrowserRouter>
    );
}

export { Routes };