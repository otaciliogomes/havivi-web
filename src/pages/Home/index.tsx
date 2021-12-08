import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card'
import { mockCard } from '../../mocks/CardsFood'

import './styles.css';
import api from '../../Service/api';

interface IProduto {
    nome: string;
    valor: number;
    imagem: string;
    descricao: string
}

const Home = () => {
    // const imgURL = "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&h=750&w=1260";
    const [produtos, setProdutos] = useState<IProduto[]>(mockCard);



    useEffect(() => {
        const getProdutos = async () => {
            const { data } = await api.get('/produtos');
            setProdutos(data)
        }

        getProdutos()

    }, [])

    return (
        <>
            <Header title="Havivis" />
            <main className="contentHome">
                <div className="titleHomeContent">
                    <h1 className="titleHome">
                        A melhor comida pelo melhor preço
                    </h1>
                    <img
                        src={`https://images.pexels.com/photos/5865071/pexels-photo-5865071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`}
                        alt=""
                        className="imagemHome"
                    />
                </div>
                {/* <section className="sectionIcons">
                    <MdOutlineFastfood className="iconsHome" />
                    <MdOutlineEmojiFoodBeverage className="iconsHome" />
                    <RiPlantFill className="iconsHome" />
                </section> */}
                <section className="contentListHome">
                    <h2 className="secondTitleHome">Comida Árabe</h2>

                    <div className="contentContact">
                        <div className="contentCardsHome">
                            {
                                <Card
                                    imagem={produtos[0].imagem}
                                    valor={produtos[0].valor}
                                    descricao={produtos[0].descricao}
                                    nome={produtos[0].nome}
                                />
                            }
                        </div>
                        <div className="contentCardsHome">
                            {
                                <Card
                                    imagem={produtos[1]?.imagem}
                                    valor={produtos[1]?.valor}
                                    descricao={produtos[1]?.descricao}
                                    nome={produtos[1]?.nome}
                                />
                            }
                        </div>
                        <div className="contentCardsHome">
                            {
                                <Card
                                    imagem={produtos[2]?.imagem}
                                    valor={produtos[2]?.valor}
                                    descricao={produtos[2]?.descricao}
                                    nome={produtos[2]?.nome}
                                />
                            }
                        </div>
                    </div>
                </section>
                <section className="contentListHomeRevert">
                    <h2 className="secondTitleHome">Comida Árabe</h2>

                    <div className="contentContact">
                        <div className="contentCardsHome">
                            {
                                <Card
                                    imagem={produtos[0].imagem}
                                    valor={produtos[0].valor}
                                    descricao={produtos[0].descricao}
                                    nome={produtos[0].nome}
                                />
                            }
                        </div>
                        <div className="contentCardsHome">
                            {
                                <Card
                                    imagem={produtos[1].imagem}
                                    valor={produtos[1].valor}
                                    descricao={produtos[1].descricao}
                                    nome={produtos[1].nome}
                                />
                            }
                        </div>
                        <div className="contentCardsHome">
                            {
                                <Card
                                    imagem={produtos[2].imagem}
                                    valor={produtos[2].valor}
                                    descricao={produtos[2].descricao}
                                    nome={produtos[2].nome}
                                />
                            }
                        </div>
                    </div>
                </section>


            </main>
            <Footer />
        </>
    )
}

export { Home }