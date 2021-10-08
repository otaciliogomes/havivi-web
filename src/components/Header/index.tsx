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
    )
}

export { Header }