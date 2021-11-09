import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CardsMesas } from '../../components/CardsMesas';
import api from '../../Service/api';
import './styles.css'

interface IPedidos {
    id: string,
    status: string,
    forma_de_pagamento: string,
    observacao: string,
    cliente_id: string,
    funcionario_id: string,
    valor: number,
    created_at: string
}

const Mesas = () => {
    const [qtdPedidos, setQtdPedidos] = useState<IPedidos[]>([]);

    const getPedidosApi = async () => {
        const { data } = await api.get<any[]>('/pedidos');
        const filterPedidos = data.filter(pedido => pedido.status != "Fechado"? pedido : null);
        setQtdPedidos(filterPedidos)
        console.log(data)
        return data;
    }

    useEffect(() => {
        getPedidosApi();
    }, [])

    const criarPedido = async () => {
        await api.post('/pedidos', {status:"Aberto", valor: 0} )
        getPedidosApi()
    }

    return (
        <>
            <Header title="Pedidos" />
            <div className="containerMesa">
                <h1>Pedido</h1>
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