import { useContext } from 'react';
import ContextTable from '../../pages/contexts/TableContext'
import './styles.css';

interface NewItemCount {
   produto: {
    id: number;
    name: string;
    preco: number
    },
    numberMesa: number;
}

interface ProdutoI {
    id: number;
    name: string;
    preco: number
}

export const ButtonAddITem = (produtoEstoque: NewItemCount) => {
    const {qtdProductsCount ,setQtdProductsCount } = useContext(ContextTable);
    const {produto, numberMesa} = produtoEstoque
    const HandleAddItem = async (item: ProdutoI) => {
        const itemsMesasLocal = await localStorage.getItem(`table${numberMesa}Item`)
        const addItemVelho = itemsMesasLocal ? JSON.parse(itemsMesasLocal) : ''
        const newItem = item
        const arrayLocalStorage = [...addItemVelho, newItem]
        // setQtdProductsCount([newItem])
        await localStorage.setItem(`table${numberMesa}Item`, JSON.stringify(arrayLocalStorage))
    }


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