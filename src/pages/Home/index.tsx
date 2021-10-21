import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { MdOutlineFastfood, MdOutlineEmojiFoodBeverage } from 'react-icons/md';
import { RiPlantFill } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiOutlineWhatsApp } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';

import './styles.css';

const Home = () => {
    const imgURL = "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&h=750&w=1260";

    return (
        <>
            <Header title="Havivis" />
            <main className="contentHome">
                <div className="titleHomeContent">
                    <h1>A melhor comida pelo <span className="titleSpan">melhor preço</span></h1>
                </div>
                <section className="sectionIcons">
                    <MdOutlineFastfood className="iconsHome" />
                    <MdOutlineEmojiFoodBeverage className="iconsHome" />
                    <RiPlantFill className="iconsHome" />
                </section>
                <section className="contentListHome">
                    <div>
                        <h2>O que o ferecemos...</h2>
                        <p><AiOutlineCheckCircle className="iconsHomeList" /> <span>Comidas Vegetarianas</span></p>
                        <p><AiOutlineCheckCircle className="iconsHomeList" /> <span>Comidas Vegetarianas</span></p>
                        <p><AiOutlineCheckCircle className="iconsHomeList" /> <span>Comidas Vegetarianas</span></p>
                        <p><AiOutlineCheckCircle className="iconsHomeList" /> <span>Comidas Vegetarianas</span></p>
                        <p><AiOutlineCheckCircle className="iconsHomeList" /> <span>Comidas Vegetarianas</span></p>
                    </div>
                    <div className="contentContact">
                        <div className="contentImgHome">
                            <img src={imgURL} className="imgListHome" />
                        </div>
                        <div className="contentDowImg">
                            <p>Entre em contato para saber mais sobre reservar</p>
                            <AiOutlineWhatsApp className="iconWhatsapp"/>
                        </div>
                    </div>
                </section>
                <fieldset className="containerTablesHome">
                    <div>
                        <BsClockHistory className="clockTable"/>
                    </div>
                    <div className="timeQueue">
                        <span>1h</span>
                        <span>Tempode espera de mesa</span>
                    </div>
                    <div className="timeQueue">
                       <span>|</span>
                    </div>
                    <div className="timeQueue">
                       <span>Consulte os funcirios para retirada de pedidos</span>
                    </div>
                </fieldset> 
            </main>
            <Footer />
        </>
    )
}

export { Home }