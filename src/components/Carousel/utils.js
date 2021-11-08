export const newObjNoReferencia = (cards) => {
    if(cards.length < 2) return;
    const cardsList = cards.map(card => {
        return {
            ...card,
            tabIndex: -1,
            autoFocusCard: false
        };
    });

    const cardListJSON = JSON.stringify(cardsList);
    const noReferenciaArray = JSON.parse(cardListJSON);

    return noReferenciaArray;
};

export const setTabindexNext = (cards) => {
    const originCardList = cards;
    const newArray = originCardList.filter(e => e.tabIndex == 0);

    if (!newArray) return;

    const max = cards.indexOf(newArray[newArray.length - 1]);
    const min = cards.indexOf(newArray[0]);

    originCardList[min].tabIndex = -1;
    originCardList[max + 1].tabIndex = 0;

    originCardList[min].autoFocusCard = false;
    originCardList[max].autoFocusCard = false;
    originCardList[max + 1].autoFocusCard = true;

    return originCardList;
};

export const setTabindexPrevius = (cards) => {
    const originCardList = cards;
    const newArray = originCardList.filter(e => e.tabIndex == 0);

    if (!newArray) return;

    const max = cards.indexOf(newArray[newArray.length - 1]);
    const min = cards.indexOf(newArray[0]);

    originCardList[max].tabIndex = -1;
    originCardList[min - 1].tabIndex = 0;

    originCardList[max].autoFocusCard = false;
    originCardList[min].autoFocusCard = false;
    originCardList[min - 1].autoFocusCard = true;

    return originCardList;
};
