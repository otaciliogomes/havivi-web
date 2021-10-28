import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CardsMesas } from '../../components/CardsMesas';
import './styles.css'

const Mesas = () => {
    const mesas = localStorage.getItem('qtdMesas')    
    const newMesas = mesas ? JSON.parse(mesas): [1]
    const [qtdTables, setQtdTables] = useState<number []>(newMesas);

    const testArray = [1, 2]

    localStorage.setItem('qtdMesas', JSON.stringify(testArray))
    return (
        <>
            <Header title="Mesas" />
            <div className="containerMesa">
                <h1>Mesas</h1>
                <button
                    className="buttonFooterCard buttonAddItem"
                    onClick={() => setQtdTables([...qtdTables, 1])}
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