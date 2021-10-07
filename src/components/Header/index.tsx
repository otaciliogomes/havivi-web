import { BsSearch } from 'react-icons/bs'
import './styles.css';

const Header = () => {
    return (
        <div className="containerHeader">
            <h1 className="titleHeader">Header</h1>
            <div className="searchInput">
                <input className="inputSearchHeader" type="text" name="" />
                <BsSearch size={28} />
            </div>
        </div>
    )
}

export { Header }