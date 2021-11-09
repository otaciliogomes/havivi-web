import api from '../../Service/api';
import './styles.css';

interface NewItemCount {
    produto: {
        id: string;
        nome: string;
        valor: number;
        descricao: string;
        imagem: string
    },
    pedido_id: string;
    closeModal: () => void;
}

export const ButtonAddITem = (props: NewItemCount) => {
    const produto = props.produto
    const pedido_id = props.pedido_id;
    
    const HandleAddItem = async () => {
        const addItem = {
            produto_id: produto.id,
            pedido_id
        }
        await api.post('/produto_pedido', addItem);
        props.closeModal()
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