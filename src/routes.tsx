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
import { TotalPedidos } from './pages/TotalPedidos';



function Routes() {
    return (

        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/mesas" component={Mesas} />
            <Route path="/total_de_pedidos" exact component={TotalPedidos} />
            <Route path="/produtos" exact component={Products} />
            <Route path="/produtos_cadastro" exact component={ProductsForm} />
            <Route path="/produtos_cadastro/:id" exact component={ProductsForm} />
            <Route path="/funcionarios" exact component={Funcionarios} />
            <Route path="/funcionarios_cadastro" exact component={FuncionariosForm} />
            <Route path="/funcionarios_cadastro/:id" exact component={FuncionariosForm} />
            <Route path="/clientes" exact component={Clientes} />
            <Route path="/clientes_cadastro" exact component={ClientesForm} />
            <Route path="/clientes_cadastro/:id" exact component={ClientesForm} />
        </BrowserRouter>
    );
}

export { Routes };