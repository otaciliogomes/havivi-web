import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import api from '../../Service/api';

import './styles.css';

interface IHeaderProps {
    title?: string;
}



const Header = ({ title }: IHeaderProps) => {
    const router = useHistory();
    const [isAdmin, setIsAdmin] = useState(false)

    const getFuncionariosAPI = async () => {
        const userAdminLocal = localStorage.getItem("userAdmin")
        const userAdmin = userAdminLocal ? JSON.parse(userAdminLocal) : false;
        // const { data } = await api.get('/funcionarios');
        setIsAdmin(userAdmin)
    }

    useEffect(() => {
        getFuncionariosAPI()
    }, [])

    return (
        <div>
            <header>
                <div className="containerHeader menu">
                    <h1 className="titleHeader">{title}</h1>
                    {/* <div className="searchInput">
                        <input className="inputSearchHeader" type="text" name="" />
                        <BsSearch className="iconSearch" size={28} />
                    </div> */}
                    {!!(title != "Havivis") && (
                        <nav className="naviContent">
                            {isAdmin && (
                                <button
                                    onClick={() => router.push('/admin')}
                                    className="buttonNav"
                                >
                                    Admin
                                </button>
                            )}
                            {isAdmin && (
                                <button
                                    className="buttonNav"
                                    onClick={() => router.push('/produtos')}
                                >
                                    Produtos
                                </button>
                            )}
                            {isAdmin && (
                                <button
                                    className="buttonNav"
                                    onClick={() => router.push('/mesas')}
                                >
                                    Pedidos
                                </button>
                            )}
                            {isAdmin && (
                                <button
                                    className="buttonNav"
                                    onClick={() => router.push('/funcionarios')}
                                >
                                    Funcionarios
                                </button>
                            )}
                            <button
                                className="buttonNav"
                                onClick={() => router.push('/clientes')}
                            >
                                Clientes
                            </button>
                            <button
                                className="buttonNav"
                                onClick={() => router.push('/')}
                            >
                                Home
                            </button>
                        </nav>
                    )}
                    <AiOutlineUser
                        size={60}
                        className="iconLogin"
                        onClick={() => router.push('/login')}
                    />
                </div>

            </header >
        </div >

    )
}

export { Header }