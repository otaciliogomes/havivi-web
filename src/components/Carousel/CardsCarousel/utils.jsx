import { cardStyles } from "./styles";
import { MdOutlineFastfood, MdOutlineEmojiFoodBeverage } from 'react-icons/md';

export const getIcon = (type) => {
    switch (type) {
    case "air":
        return <MdOutlineFastfood />;
    case "hotel":
        return <MdOutlineFastfood />;
    case "package":
        return <MdOutlineFastfood />;
    case "resort":
        return <MdOutlineFastfood />;
    case "car":
        return <MdOutlineFastfood />;
    default:
        return <></>;
    }
};
export const getType = (type) => {
    switch (type) {
    case "air":
        return "Aéreo";
    case "hotel":
        return "Hotel";
    case "package":
        return "Pacotes";
    case "resort":
        return "Resortes";
    case "car":
        return "Carros";
    default:
        return <></>;
    }
};

export const getColor = (type) => {
    switch (type) {
    case "air":
        return "#0033FF";
    case "hotel":
        return "#00efe8";
    case "package":
        return "#EC7000";
    case "resort":
        return "#0033FF";
    case "car":
        return "#D2DCDE66";
    default:
        return <></>;
    }
};

export const getHover = (type) => {
    switch (type) {
    case "air":
        return "rootAir";
    case "hotel":
        return "rootHotel";
    case "package":
        return "rootPackage";
    case "resort":
        return "rootResort";
    case "car":
        return "rootCar";
    default:
        return <></>;
    }
};


export const getContentCard = (type, card) => {
    const arrivalDate = ""
    const classes = cardStyles({});
    switch (type) {
    case "air":
        return (
            <div className={classes.containerSetContent}>
                {getIcon(type)}
                <span className={classes.dateFlight}>{arrivalDate}</span>
            </div>
        );
    case "hotel":
        return (
            <div className={classes.containerSetContent}>
                <span className={classes.title}>{card.zone}</span>
            </div>
        );
    // case "package":
    //     return (
    //         <div>
    //             {getIcon(type)}
    //             <span className={classes.dateFlight}>{arrivalDate}</span>
    //         </div>
    //     )
    }
};
