import { useContext } from 'react';
import ContextTable from '../../pages/contexts/TableContext'
import './styles.css';

interface NewItemCount {
   produto: {
    id: number;
    name: string;
    preco: number
    }
}

interface ProdutoI {
    id: number;
    name: string;
    preco: number
}

export const ButtonAddITem = (produtoEstoque: NewItemCount) => {
    const {qtdProductsCount ,setQtdProductsCount } = useContext(ContextTable);
    const {produto} = produtoEstoque
    const HandleAddItem = (item: ProdutoI) => {
        const newItem = item
        console.log(newItem)
        setQtdProductsCount([newItem])
    }

    console.log(produto)

    return (
        <>
            <button
                onClick={() => HandleAddItem(produto)}
                key={produto.id}
                className="btnListItemAdd"
            >
                {produto.name}
                {`R$ ${produto.preco}`}
            </button>
        </>
    )
}