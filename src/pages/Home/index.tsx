import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card'


import './styles.css';

const Home = () => {


    const cards = [
        {
            nome: "Kafta",
            imagem: "http://receitasdeminuto.com/wp-content/uploads/2018/01/3_receitas_de_kaftas1.jpg",
            valor: 0,
            descricao: "Espetinho árabe feito com carne moída, temperos e especiarias"
        },
        {
            nome: "Tabule",
            imagem: "https://s2.glbimg.com/eUf26soe8YGIWpr9qtBiiA7kRsw=/0x0:472x311/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2013/08/03/16_18_12_830_Tabule.jpg",
            valor: 0,
            descricao: "Leve e Saudável. Salada árabe tradicional a base de trigo para quibe e vegetais que trazem frescor ao prato."
        },
        {
            nome: "Esfirra de carne fechada",
            imagem: "https://www.umugas.com.br/fotos/receita/Esfiha-%C3%A1rabe.jpg",
            valor: 0,
            descricao: "As famosas e tradicionais esfirras árabes são feitas a base de farinha de trigo e carne moída. Um clássico que nunca perde a majestade"
        }
    ]


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
                                cards.map((card, index) => (
                                    <Card
                                        key={index}
                                        imagem={card.imagem}
                                        valor={card.valor}
                                        descricao={card.descricao}
                                        nome={card.nome}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </section>
                <section className="contentListHomeRevert">
                    <h2 className="secondTitleHome">Comida Árabe</h2>

                    <div className="contentContact">
                    <div className="contentCardsHome">
                            {
                                cards.map((card, index) => (
                                    <Card
                                        key={index}
                                        imagem={card.imagem}
                                        valor={card.valor}
                                        descricao={card.descricao}
                                        nome={card.nome}
                                    />
                                ))
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