import './styles.css';

interface ICardProps {
    img: string;
    title: string;
    description: string;
}

const Card = (props: ICardProps): JSX.Element => {
    return (
        <div className="containerCard">
            {/* <div className="contentImg"> */}
            <img className="imgCard" src={props.img} />
            {/* </div> */}
            <div className="infoCard">
                <p className="titleCard">{props.title}</p>
                <div className="descriptionCard">
                    {props.description}
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