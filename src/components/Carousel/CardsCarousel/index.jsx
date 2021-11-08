import { useContext, useEffect, useState } from "react";
import CarouselContext from "../ContextCarousel";
import clsx from "clsx";
import { getType, getContentCard, getColor } from './utils';
import { cardStyles } from "./styles";
import { rootProd } from "./stylesProds";
import { useHistory } from 'react-router-dom';

const CardsCarousel = ({ props, type, tabIndex }) => {
    const [colorBackground] = useState(getColor(type));
    const { onClickKeybord, setOnClickKeybord } = useContext(CarouselContext);
    const router = useHistory();
    const classes = cardStyles();
    const classeRoot = rootProd();

    useEffect(() => {
        if(props.autoFocusCard) {
            setTimeout(() => {
                try {
                    const elem = document.getElementById(`trueFocus${props.imagem}`);
                    elem?.focus();
                } catch {
                    return;
                }
            }, 1000)
        }
        setOnClickKeybord(false)
        return
    }, [props.autoFocusCard]);
    return (
        <>

            <a
                role="link"
                onClick={() => router.push(props.imagem)}
                onKeyPress={() => router.push(props.imagem)}
                tabIndex={tabIndex}
                id={`${props.autoFocusCard}Focus${props.imagem}`}
                className={
                    clsx(
                        type == "air" && classeRoot.rootAir,
                        type == "hotel" && classeRoot.rootHotel,
                        type == "package" && classeRoot.rootPackage,
                        type == "resort" && classeRoot.rootResort,
                        type == "car" && classeRoot.rootCar
                    )
                }
            >
                <div className={classes.contentCard} >
                    <div className={classes.contentImg}>
                        <img className={classes.imgCard} src={props.imagem} title={props.destination} alt="" />
                    </div>
                    <div className={classes.infoCard}>
                        <div className={classes.destinationDate}>
                            <p className={classes.title}>{props.name}</p>
                            <p className={classes.dateFlightP}>
                                {props.descricao}
                            </p>
                        </div>
                        <p className={classes.price}>Confira!</p>
                    </div>
                </div>
            </a >
            {/* {matchesMdUp && (
                <a
                    role="link"
                    onClick={() => router.push(props.imagem)}
                    onKeyPress={() => router.push(props.imagem)}
                    tabIndex={props.tabIndex}
                    id={`${props.autoFocusCard}Focus${props.imagem}`}
                    className={
                        clsx(
                            type == "air" && classeRoot.rootAir,
                            type == "hotel" && classeRoot.rootHotel,
                            type == "package" && classeRoot.rootPackage,
                            type == "resort" && classeRoot.rootResort,
                            type == "car" && classeRoot.rootCar
                        )
                    }
                >
                    <div className={classes.contentCard} >
                        <div className={classes.contentImg}>
                            <img className={classes.imgCard} src={imagemImage} title={props.destination} alt="" />
                            <div
                                className={classes.floatingBtn}
                                style={{ background: colorBackground, color: type == "hotel" ? "#000 " : "#FFF" }}
                            >
                                {getType(type)}
                            </div>
                        </div>
                        <div className={classes.infoCard}>
                            <div className={classes.destinationDate}>
                                <p className={classes.title}>{props.destination}</p>
                                <p className={classes.dateFlightP}>
                                    {getContentCard(type, props)}
                                </p>
                            </div>
                            <p className={classes.price}>Confira!</p>
                        </div>
                    </div>
                </a >)} */}
        </>
    )
}

export default CardsCarousel;
