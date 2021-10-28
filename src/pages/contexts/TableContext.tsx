import { createContext, useState } from 'react';
import mock from '../../components/CardsMesas/mockInitial.json'

interface NewItemCount {
    produtos: [{
        id: number;
        name: string;
        preco: number
    }]
}
interface IProduct {
    qtdProductsCount: Object | null;
    setQtdProductsCount: (active: NewItemCount[]) => void;
}

const ContextTable = createContext<IProduct>({} as IProduct);


export const ProviderTable = ({ children }: any) => {
    const [qtdProductsCount, setQtdProductsCount] = useState(mock)
    return (
        <ContextTable.Provider value={{ qtdProductsCount, setQtdProductsCount }}>
            {children}
        </ContextTable.Provider>
    )
}

export default ContextTable;