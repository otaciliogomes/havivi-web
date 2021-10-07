import { Card } from '../../components/Card';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { mockCard } from '../../mocks/CardsFood';
import './styles.css';

const Home = () => {
    return (
        <>
            <Header />
            <div className="contentHome">
                {/* Colocar um carrossel futuramente */}
                <div >
                    {/* <img className="imgHome" src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" /> */}
                    <h1>A melhor comida pelo melhor preço</h1>
                </div>
                <section className="sectionImg">
                    <p className="titleChefe">Desde 1980 trazendo a tradição de familia...</p>
                    <span>
                        It is a long established fact that a reader will be distracted by the readable content of
                        a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                        of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum
                        as their default model text, and a search for 'lorem ipsum' will uncover many web sites still
                        in their infancy. Various versions have evolved over the years, sometimes
                        by accident, sometimes on purpose (injected humour and the like).
                    </span>
                    <span>Chefe Havive</span>
                    <img className="imgChefe" src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Chefe" />
                </section>
                <section className="secetionCard">
                    {mockCard.map(card => (
                        <Card
                            title={card.title}
                            img={card.img}
                            description={card.description}
                        />
                    ))}
                </section>
            </div>
            <Footer />
        </>
    )
}

export { Home }