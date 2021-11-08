import './styles.css';

interface ICardProps {
    imagem: string;
    nome: string;
    descricao: string;
    valor: number;
}

const Card = (props: ICardProps): JSX.Element => {
    return (
        <div className="containerCard">
            {/* <div className="contentImg"> */}
            <img className="imgCard" src={props.imagem} />
            {/* </div> */}
            <div className="infoCard">
                <p className="titleCard">{props.nome}</p>
                <div className="descriptionCard">
                    {props.descricao}
                </div>
                <button 
                    className="viewMore"
                >
                    Comprar
                </button>
            </div>
        </div>
    )
}

export { Card };