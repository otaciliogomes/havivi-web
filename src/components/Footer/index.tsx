import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './styles.css';

const Footer = () => {
    return (
        <div className="containerFooter">
            <div className="contentFooter">
                <h2 className="titleFooter">Havivi</h2>
                <div className="subtitleFooter">
                    <p className="descriptionFooter">Termos de uso</p>
                    <p className="descriptionFooter">Fale conosco</p>
                    <p className="descriptionFooter">Privacidade</p>
                    <p className="descriptionFooter">Havive CNPJ: 598.0569.914/0005-05</p>
                </div>
            </div>
            <div className="contentFooter">
                <h2 className="titleFooter">Contato</h2>
                <div className="subtitleFooter">
                    <p className="descriptionFooter">Tel:(11) 1020-3040</p>
                    <p className="descriptionFooter">E-mail: havive@email.com</p>
                    <p className="descriptionFooter">End: Av. Rudge, 315 - Barra Funda </p>
                </div>
            </div>
            <div className="contentFooter">
                <h2 className="titleFooter">Nossas redes social</h2>
                <div className="subtitleFooter">
                    <p className="descriptionFooter">
                        <FaFacebook className="iconFooter" size={28}/>
                    </p>
                    <p className="descriptionFooter">
                        <FaInstagram className="iconFooter" size={28}/>
                    </p>
                    <p className="descriptionFooter">
                        <FaLinkedinIn className="iconFooter" size={28}/>
                    </p>
                </div>
            </div>
        </div>
    )
}

export { Footer }