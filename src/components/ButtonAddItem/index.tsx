
import api from '../../Service/api';
import './styles.css';
import { ProdutoRequest } from '../../interface/index'

interface PropsButton {
    produto: ProdutoRequest;
    pedido: any;
    closeModal: () => void;
}

export const ButtonAddITem = ({ produto, pedido, closeModal }: PropsButton) => {


    const HandleAddItem = async () => {
        await api.post('/produto_pedido', {
            pedido_id: pedido.id,
            produto_id: produto.id,
            valor: produto.valor
        });
        
        closeModal()
    }


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