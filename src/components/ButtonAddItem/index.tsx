import { useEffect } from 'react';
import api from '../../Service/api';
import './styles.css';
import { ProdutoRequest, PedidosRequest, CloseModal } from '../../interface/index'

interface PropsButton {
    produto: ProdutoRequest;
    pedido: any;
    closeModal: () => void;
}

export const ButtonAddITem = ({ produto, pedido, closeModal }: PropsButton) => {


    const HandleAddItem = async () => {
        const addItem = {
            produto: produto.id,
            pedido: pedido.id,
            valor: produto.valor,
            quantidade: 1
        }

        const { data } = await api.get<PedidosRequest>(`/pedidos/${pedido.id}`)

        const valorExtra = data?.valorExtra + produto.valor;

        await api.put('/pedidos', {
            id: pedido.id,
            status: "Em andamento",
            valorExtra,
            cliente: pedido.cliente,
            funcionario: pedido.funcionario
        });
        await api.post('/produto_pedido', addItem);
        closeModal()
    }

    useEffect(() => {
        console.log(produto)
    }, [])

    return (
        <>
            <button
                onClick={HandleAddItem}
                key={produto.id}
                className="btnListItemAdd"
            >
                {produto.nome}
                {` R$ ${produto.valor}`}
            </button>
        </>
    )
}