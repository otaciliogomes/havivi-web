import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Mesas } from './pages/Mesa';

import { Products } from './pages/Produto';
import { ProductsForm } from './pages/Produto/Form';
import { Funcionarios } from './pages/Funcionario';
import { FuncionariosForm } from './pages/Funcionario/Form';
import { Clientes } from './pages/Cliente';
import { ClientesForm } from './pages/Cliente/Form';



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
            <Route path="/funcionarios"  component={Funcionarios} />
            <Route path="/funcionarios_cadastro"  component={ FuncionariosForm } />
            <Route path="/funcionarios_cadastro/:id"  component={ FuncionariosForm } />
            <Route path="/clientes"  component={Clientes} />
            <Route path="/clientes_cadastro"  component={ ClientesForm } />
            <Route path="/clientes_cadastro/:id"  component={ ClientesForm } />
        </BrowserRouter>
    );
}

export { Routes };