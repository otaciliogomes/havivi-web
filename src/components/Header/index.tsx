import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { GiExitDoor } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import api from '../../Service/api';

import './styles.css';

interface IHeaderProps {
    title?: string;
}



const Header = ({ title }: IHeaderProps) => {
    const router = useHistory();
    const [isAdmin, setIsAdmin] = useState(false)
    const [token, setToken] = useState('');

    const getFuncionariosAPI = async () => {
        const userAdminLocal = localStorage.getItem("userAdmin")
        const userAdmin = userAdminLocal ? JSON.parse(userAdminLocal) : false;
        // const { data } = await api.get('/funcionarios');
        setIsAdmin(userAdmin)
    }

    const resetToken = () => {
        localStorage.setItem('token', '');
        setToken('')
        router.push('/')
    }

    useEffect(() => {
        const tokenJSON = localStorage.getItem('token');
        const getToken = tokenJSON ? JSON.parse(tokenJSON) : '';
        setToken(getToken)
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
                    {title == "Havivis" && isAdmin && (
                        <button
                            onClick={() => router.push('/admin')}
                            className="buttonNav"
                        >
                            Voltar
                        </button>
                    )}
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
                                    onClick={() => router.push('/pedidos')}
                                >
                                    Pedidos
                                </button>
                            )}
                            {isAdmin && (
                                <button
                                    className="buttonNav"
                                    onClick={() => router.push('/funcionarios')}
                                >
                                    Funcionários
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

                    {token ? (<GiExitDoor
                        size={60}
                        className="iconLogin"
                        onClick={() => resetToken()} />) :
                        (<AiOutlineUser
                            size={60}
                            className="iconLogin"
                            onClick={() => router.push('/login')}
                        />)
                    }
                </div>

            </header >
        </div >

    )
}

export { Header }