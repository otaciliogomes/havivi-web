import { createContext, useState } from 'react';

interface IProduct {
    id: number;
    name: string;
    price: number;
    qtdProductsCount: Object;
    setQtdProductsCount: () => void;
}

const ContextTable = createContext<IProduct>({} as IProduct);


export const ProviderTable = ({ children }: any) => {
    const [qtdProductsCount, setQtdProductsCount] = useState([])
    return (
        <ContextTable.Provider value={qtdProductsCount, setQtdProductsCount}>
            {children}
        </ContextTable.Provider>
    )
}

export default ContextTable;