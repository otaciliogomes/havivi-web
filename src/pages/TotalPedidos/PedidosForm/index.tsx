import { useEffect, useState } from 'react';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../Service/api';
import { PedidosRequest } from '../../../interface/index';
import "./styles.css";


const PedidosForm = () => {
    const [pedido, setPedido] = useState<PedidosRequest>({} as PedidosRequest);
    const { id } = useParams<{ id: string }>();

    const getPedidosApi = async () => {

        const { data } = await api.get<PedidosRequest>(`/pedidos/${id}`);
        setPedido(data);
        console.log(data)
    }

    useEffect(() => {
        getPedidosApi()
    }, [])
    return (
        <>
            <Header />
            <div className="formPedidoEditContent">
                <form className="formPedidoEdit">
                    <span>ID - {pedido.id}</span>

                    <label htmlFor={pedido.status}>Status</label>
                    <input id={pedido.status} value={pedido.status} />

                    <label htmlFor={pedido.status}>Status</label>
                    <input value={pedido.status} />

                    <label htmlFor={pedido.status}>Valor</label>
                    <input value={pedido.valor} />

                    <label htmlFor={pedido.funcionario_id?.nome}>Nome funcionário</label>
                    <input id={pedido.funcionario_id?.nome} value={pedido.funcionario_id?.nome} />

                    <label htmlFor={pedido.cliente_id?.nome}>Nome cliente</label>
                    <input id={pedido.cliente_id?.nome} value={pedido.cliente_id?.nome} />

                    <label htmlFor={pedido.forma_de_pagamento}>Forma de pagamento</label>
                    <input id={pedido.forma_de_pagamento} value={pedido.forma_de_pagamento} />

                </form>
            </div>
            <Footer />
        </>
    );
}

export default PedidosForm