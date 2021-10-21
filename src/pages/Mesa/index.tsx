import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CardsMesas } from '../../components/CardsMesas';
import './styles.css'

const Mesas = () => {
    const [qtdTables, setQtdTables] = useState([1]);
    return (
        <>
            <Header title="Mesas" />
            <div className="containerMesa">
                <h1>Mesas</h1>
                <button
                    className="buttonFooterCard buttonAddItem"
                    onClick={() => setQtdTables((prevValue) => [...prevValue, 1])}
                >
                    Adicionar Mesa +
                </button>
                <div className="contentMesas">
                    {qtdTables.map((element, index) => {
                        return (
                            <CardsMesas numberMesa={index} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}

export { Mesas }