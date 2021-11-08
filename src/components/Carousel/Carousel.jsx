import React, { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@material-ui/core";


import { newObjNoReferencia, setTabindexNext, setTabindexPrevius } from "./utils";
import CardsCarousel from "./CardsCarousel";
import { carouselStyles } from "./styles";
import CarouselContext from "./ContextCarousel";

const Carousel = (props) => {
    const { setOnClickKeybord } = useContext(CarouselContext);
    const matchesMdDown = useMediaQuery("(min-width: 960px)");
    const matchesMdUp = useMediaQuery("(max-width: 961px)");
    const classes = carouselStyles({});

    const cardsList = props.produto.map((card, index) => {
        return {
            ...card,
            tabIndex: index < 3 ? 0 : -1,
            autoFocusCard: false
        };
    });

    const [idz, setIdz] = useState(cardsList.length - 1);
    const [idy, setIdy] = useState(0);
    const [countX, setCountx] = useState(1);
    const [count, setCount] = useState(0);
    const [newCardList, setNewCardList] = useState(cardsList);

    const addCardNext = () => {
        const [continueArray] = cardsList.slice(newCardList.length, (newCardList.length + 1));
        if (continueArray) {
            setCountx(countX + 1);
            const firstCard = [...newCardList, continueArray];
            const cardsListTabIbdex = setTabindexNext(firstCard);
            setNewCardList(cardsListTabIbdex);
            setCount((prevCount) => prevCount - 206);
            return;
        }

        let lastCard = {};
        const noReferenciaArray = newObjNoReferencia(cardsList);
        if (idy >= noReferenciaArray.length) {
            [lastCard] = noReferenciaArray.slice(0);
            setIdy(1);
        } else {
            [lastCard] = noReferenciaArray.slice(idy);
            setIdy(idy + 1);
        }

        let firstCard = [];
        firstCard = [...newCardList, lastCard];
        const cardsListTabIbdex = setTabindexNext(firstCard);
        setNewCardList(cardsListTabIbdex);
        setCount((prevCount) => prevCount - 206);
        return;
    };

    const addCardBefore = () => {
        let firstCard;
        const noReferenciaArray = newObjNoReferencia(cardsList);

        if (idz < 0) {
            [firstCard] = noReferenciaArray.slice(noReferenciaArray.length - 1);
            setIdz(noReferenciaArray.length - 2);
        } else {
            [firstCard] = noReferenciaArray.slice(idz);
            setIdz(idz - 1);
        }

        const fullCardList = [firstCard, ...newCardList];
        const cardsListTabIbdex = setTabindexPrevius(fullCardList);
        setNewCardList(cardsListTabIbdex);
        return;
    };

    return (
        <div className={classes.root}>
            <div className={classes.container} >
                {!(props.produto.length < 2) && (
                    <button
                        type="button"
                        aria-label="voltar"
                        onKeyPress={() => setOnClickKeybord(true)}
                        onClick={() => addCardBefore()}
                        className={classes.buttonCarouselLeft}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size="1x" aria-label="" />
                    </button>
                )
                }
                <div
                    className={classes.divCards}
                    style={{ transform: `translatex(${count}px)` }}
                >
                    {
                        !matchesMdDown &&
                        (newCardList.map((infoCard) => {
                            return (
                                <CardsCarousel type="hotel" tabIndex={0} props={infoCard} />
                            );
                        }))
                    }
                    {
                        !matchesMdUp &&
                        (newCardList.map((infoCard) => {
                            return (
                                <CardsCarousel type="hotel" tabIndex={infoCard.tabIndex} props={infoCard} />
                            );
                        }))
                    }
                </div>
                {!(props.produto.length < 2) && (
                    <button
                        type="button"
                        aria-label="avançar"
                        onKeyPress={() => setOnClickKeybord(true)}
                        onClick={() => addCardNext()}
                        className={classes.buttonCarouselRight}
                    >
                        <FontAwesomeIcon icon={faAngleRight} size="1x" aria-label="" />
                    </button>
                )
                }
            </div>
        </div>
    );
};
export default Carousel;
