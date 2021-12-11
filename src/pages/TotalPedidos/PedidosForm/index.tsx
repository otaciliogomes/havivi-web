import { useEffect, useState, ChangeEvent } from 'react';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import { useParams } from 'react-router-dom';
import api from '../../../Service/api';
import { PedidosRequest } from '../../../interface/index';
import "./styles.css";
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

interface IPedido {
    id?: string,
    status?:  string,
    valor?: string,
    funcionario_id?: {
        nome: string
    },
    cliente_id?:   {
        nome: string
    },
    forma_de_pagamento?: string
    cliente?: string
    funcionario?: string
}

const PedidosForm = () => {
    const [pedido, setPedido] = useState<IPedido | any>({
        status: "",
        valor: "",
        funcionario:"",
        cliente: "",
        forma_de_pagamento: ""
    });
    const router = useHistory();
    const [newPedido, setNewPedido] = useState('');
    const [newPedidoValor, setNewPedidoValor] = useState('');
    const [newPedidoFuncionario, setNewPedidoFuncionario] = useState('');
    const [newPedidoCliente, setNewPedidoCliente] = useState('');
    const [newPedidoFormaPag, setNewPedidoFormaPag] = useState('');

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id !== undefined) {
            getPedidosApi(id)
        }
    }, [id]);

    const getPedidosApi = async (id:string) => {
        const { data } = await api.get<IPedido | any>(`/pedidos/${id}`);
        console.log(data)
        setPedido({
            status: data.status,
            valor: data.valor,
            funcionario: data?.funcionario_id?.nome,
            cliente: data?.cliente_id?.nome,
            forma_de_pagamento: data.forma_de_pagamento,
            id: data.id,
        });
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        console.log(e)
        const target = e.target;
        const value = target.value
        const name = target.name

        setPedido({
            ...pedido,
            [name]: value
        })

    }

    const updatePedido = async () => {
        console.log({
            id: pedido.id,
            status: pedido.status,
            valor: Number(pedido.valor),
            funcionario_id: pedido.funcionario,
            cliente_id: pedido.cliente,
            forma_de_pagamento: pedido.forma_de_pagamento,
        })

        // await api.put('/pedidos', {
        //     id: pedido.id,
        //     status: pedido.status,
        //     valor: Number(pedido.valor),
        //     funcionario_id: pedido.funcionario,
        //     cliente_id: pedido.cliente,
        //     forma_de_pagamento: pedido.forma_de_pagamento,
        // });


        toast.warning("Pedido alterado!")

        setTimeout(() => {
            router.push('/total_de_pedidos')
        }, 1000)
    }

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="formPedidoEditContent">
                <form className="formPedidoEdit">
                    <span>ID - {pedido.id}</span>

                    <label htmlFor={pedido.status}>Status</label>
                    <input
                        id={pedido.status}
                        value={pedido.status}
                        type="text"
                        name="status"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    />

                    <label htmlFor={pedido.valor}>Valor</label>
                    <input
                        value={pedido.valor}
                        type="text"
                        name="valor"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    />

                    <label htmlFor={pedido.funcionario}>Nome funcionário</label>
                    <input
                        id={pedido.funcionario}
                        value={pedido.funcionario}
                        type="text"
                        name="funcionario"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    />

                    <label htmlFor={pedido.cliente}>Nome cliente</label>
                    <input
                        id={pedido.cliente}
                        value={pedido.cliente}
                        type="text"
                        name="cliente"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    />

                    <label htmlFor={pedido.forma_de_pagamento}>Forma de pagamento</label>
                    <input
                        id={pedido.forma_de_pagamento}
                        value={pedido.forma_de_pagamento}
                        type="text"
                        name="forma_de_pagamento"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    />
                    <button
                        className="buttonFooterCard buttonAddItem"
                        onClick={updatePedido}
                    >
                        Alterar
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default PedidosForm