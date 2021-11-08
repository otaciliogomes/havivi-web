import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { MdOutlineFastfood, MdOutlineEmojiFoodBeverage } from 'react-icons/md';
import { RiPlantFill } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiOutlineWhatsApp } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';
import { CarouselComponent } from '../../components/Carousel'
import { Card } from '../../components/Card'

import './styles.css';
import api from '../../Service/api';

interface IProduto {
    nome: string;
    valor: number;
    imagem: string;
    descricao: string
}

const Home = () => {
    const imgURL = "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&h=750&w=1260";
    const [produtos, setProdutos] = useState<IProduto[]>([]);



    useEffect(() => {
        const getProdutos = async () => {
            const { data } = await api.get('/produto');
            setProdutos(data)
        }

        getProdutos()

    }, [])

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
                    {/* <div>
                        <CarouselComponent produto={produtos} />
                    </div> */}
                    <div className="contentContact">
                        <div className="contentImgHome">
                            <img src={imgURL} className="imgListHome" />
                        </div>
                        <div className="contentDowImg">
                            <p>Entre em contato para saber mais sobre reservar</p>
                            <AiOutlineWhatsApp className="iconWhatsapp" />
                        </div>
                    </div>
                </section>
                    {
                        produtos.map(produto => {
                            <Card  
                                imagem={produto.imagem}
                                valor={produto.valor}
                                descricao={produto.descricao}
                                nome={produto.nome}
                            />
                        })
                    }
            </main>
            <Footer />
        </>
    )
}

export { Home }