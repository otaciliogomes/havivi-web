import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CardsMesas } from '../../components/CardsMesas';
import { toast, ToastContainer } from 'react-toastify';
import Error from '../../components/ErrorLogin';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Service/api';
import './styles.css'
import { PedidosRequest } from '../../interface/index';


const Mesas = () => {

    const tokenJSON = localStorage.getItem('token');
    const token = tokenJSON ? JSON.parse(tokenJSON) : '';

    const [qtdPedidos, setQtdPedidos] = useState<PedidosRequest[]>([]);
    

    const getPedidosApi = async () => {
        const { data } = await api.get<PedidosRequest[]>('/pedidos');
        const filterPedidos = data.filter(pedido => pedido.status != "Fechado"? pedido : null);
        setQtdPedidos(filterPedidos)
        return data;
    }

    useEffect(() => {
        getPedidosApi();
    }, [])

    const criarPedido = async () => {
        const idFuncionarioLogado = localStorage.getItem('FuncionarioID');
        const idFuncionario = idFuncionarioLogado ? JSON.parse(idFuncionarioLogado) : '';
        await api.post('/pedidos', {status:"Aberto", valor: 0, funcionario: idFuncionario} )
        getPedidosApi()
        toast.success("Pedido Criado")
    }

    const renderErrorLog = (
        <>
            <h1 className="erroLogin" >Erro de login!</h1>
            <h2 className="erroLogin" >Por favor,realizar o login!</h2>
            <Error />
        </>
    )

    const renderMesa = (
        <>
            <Header title="Pedidos" />
            <ToastContainer />
            <div className="containerMesa">
                <h1>Pedidos - {qtdPedidos.length}</h1>
                <button
                    className="buttonFooterCard buttonAddItem"
                    onClick={criarPedido}
                >
                    Adicionar Pedido +
                </button>
                <div className="contentMesas">
                    {qtdPedidos.map((element, index) => {
                        console.log(element)
                        return (
                            <CardsMesas title="Pedido" pedido={element} numberMesa={element.id} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )


    return (
        token ? renderMesa : renderErrorLog
    )
}

export { Mesas }