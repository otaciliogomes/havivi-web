import { useEffect, useState } from 'react';
// import { BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
// import api from '../../Service/api';

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
    })


    const sairDoApp = () => {
        localStorage.setItem('token', "" )
        localStorage.setItem('userAdmin', "" )
        localStorage.setItem('FuncionarioID', "")
    }

    return (
        <header style={{overflow: "auto", paddingLeft: "20px"}}>
            <div>
                <div className="containerHeader menu">
                    <h1 className="titleHeader">{title}</h1>
                    {/* <div className="searchInput">
                        <input className="inputSearchHeader" type="text" name="" />
                        <BsSearch className="iconSearch" size={28} />
                    </div> */}
                    {title === "Havivis" && isAdmin && (
                                <button
                                    onClick={() => router.push('/admin')}
                                    className="buttonNav"
                                >
                                    Voltar
                                </button>
                    )}
                    {isAdmin && (
                                <button
                                    onClick={() => sairDoApp()}
                                    className="buttonNav"
                                >
                                    Sair
                                </button>
                    )}
                    {!!(title !== "Havivis") && (
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
                    <AiOutlineUser
                        size={60}
                        className="iconLogin"
                        onClick={() => router.push('/login')}
                    />
                </div>

            </div >
        </header >

    )
}

export { Header }