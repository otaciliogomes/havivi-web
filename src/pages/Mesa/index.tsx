import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CardsMesas } from '../../components/CardsMesas';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {api2} from '../../Service/api';
import './styles.css'
import { PedidosRequest } from '../../interface/index';


const Mesas = () => {
    const [qtdPedidos, setQtdPedidos] = useState<PedidosRequest[]>([]);

    const getPedidosApi = async () => {
        const { data } = await api2.get<PedidosRequest[]>('/pedidos');
        const filterPedidos = data.filter(pedido => pedido.status !== "Fechado" ? pedido : null);
        setQtdPedidos(filterPedidos)
        return data;
    }

    useEffect(() => {
        const renderPage = async() => {
            await getPedidosApi();
        }
        renderPage();
    },[])

    const criarPedido = async () => {
        const idFuncionarioLogado = await localStorage.getItem('FuncionarioID');
        const funcionario_id = idFuncionarioLogado ? JSON.parse(idFuncionarioLogado) : '';
        const { data } = await api2.post('/pedidos', {funcionario_id});
        console.log(data);
        await getPedidosApi()
        toast.success("Pedido Criado")
        window.scrollTo({ top: 200 * qtdPedidos.length, behavior: "smooth" })
    }

    return (
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
                        return (
                            <CardsMesas title="Pedido" pedido={element} numberMesa={index + 1} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}

export { Mesas }