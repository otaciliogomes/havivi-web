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
        getPedidosApi();
    }, [])

    const criarPedido = async () => {
        // const idFuncionarioLogado = localStorage.getItem('FuncionarioID');
        const { data } = await api2.post('/pedidos');
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
                        console.log(element)
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