import { BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import './styles.css';

interface IHeaderProps {
    title?: string;
}

const Header = ({ title }: IHeaderProps) => {
    const router = useHistory();

    return (
        <div>
            <div className="containerHeader">
                <h1 className="titleHeader">{title}</h1>

                {/* <div className="searchInput">
                <input className="inputSearchHeader" type="text" name="" />
                <BsSearch className="iconSearch" size={28} />
            </div> */}
                <AiOutlineUser
                    size={60}
                    className="iconLogin"
                    onClick={() => router.push('/login')}
                />
            </div>
            {!!(title != "Havivis") && (
                <nav className="naviContent">
                    <button
                        onClick={() => router.push('/admin')}
                        className="buttonNav"
                    >
                        Admin
                    </button>
                    <button
                        className="buttonNav"
                        onClick={() => router.push('/produtos')}
                    >
                        Produtos
                    </button>
                    <button
                        className="buttonNav"
                        onClick={() => router.push('/mesas')}
                    >
                        Mesas
                    </button>
                    <button
                        className="buttonNav"
                        onClick={() => router.push('/funcionarios')}
                    >
                        Funcionarios
                    </button>
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

        </div>
    )
}

export { Header }