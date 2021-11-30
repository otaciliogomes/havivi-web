import { createContext, useState, useEffect } from 'react';
import mock from '../../components/CardsMesas/mockInitial.json'
import api from '../../Service/api';

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
    setFuncID: (active:string) => void;
    funcID: string;
}

const ContextTable = createContext<IProduct>({} as IProduct);


export const ProviderTable = ({ children }: any) => {
    const [qtdProductsCount, setQtdProductsCount] = useState(mock);
    const [funcID, setFuncID] = useState("");
    
    useEffect(() => {
        const tokenJSON = localStorage.getItem('token');
        const token = tokenJSON ? JSON.parse(tokenJSON) : '';
        api.defaults.headers = {Authorization: token}
    },[])

    return (
        <ContextTable.Provider value={{ qtdProductsCount, setQtdProductsCount, setFuncID, funcID}}>
            {children}
        </ContextTable.Provider>
    )
}

export default ContextTable;