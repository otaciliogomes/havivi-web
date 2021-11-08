import { makeStyles, Theme } from "@material-ui/core";

const cardStyles = makeStyles<Theme>(() => ({
    root : {
        display: "flex",
        flexDirection: "column",
        background: "#FFF",
        height: "376px",
        width: "400px",
        margin: "8px",
        fontFamily: "Open Sans",
        borderRadius: "20px",
        boxSizing: "border-box",
        boxShadow: "0px 0px 6px 0px rgb(0 0 0 / 10%)",
        cursor: "pointer",
        textDecoration: "none",
        color: "#000",
        transition: "0.5s",
        border: "2px solid transparent",
        padding: 0,
        "&:hover": {
            borderColor: "#00efe8",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        },
        "&:focus": {
            borderColor: "#00efe8",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        },
    },
    "$div": {
        "&:focus": {
            border: "none"
        }
    },
    contentCard: {
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "20px",
        overflow: "hidden",
        width: "186px",
        height: "376px",
        background: "#FFF",
        textDecoration: "none",
        color: "#000",
    },
    contentImg: {
        borderRadius: "20px 20px 0px 0px",
        position: "relative",
        width: "100%",
        height: "50%",
        background: "#fafafa",
    },
    imgCard: {
        borderRadius: "20px 20px 0px 0px",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "0.5s",
    },
    floatingBtn : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: "-12px",
        right: "18px",

        width: "70px",
        height: "24px",
        borderRadius: "20px",
        fontSize: "12px",

        color: "#FFF",
        background: "#038EAD",
    },
    infoCard : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "10px",
        height: "50%",
    },
    destinationDate:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    price: {
        fontWeight: "bolder",
        fontSize: "26px",
        marginTop: "0px",
    },
    title: {
        fontWeight: "bolder",
        fontSize: "18px",
        marginBottom: "0px",
    },
    dateFlight: {
        marginLeft: "10px",
        marginTop: "0px",
    },
    dateFlightP: {
        marginTop: 0,
    },
    reset: {
        all: "unset",
    },
    h1title: {
        "&:focus": {
            border: "solid 2px #000"
        }
    },
    containerSetContent: {
        display: "flex",
    },
    "borderColorAir": {
        "&:hover": {
            borderColor: "#0033FF",
        },
        "&:focus": {
            borderColor: "#0033FF",
        },
    },
    "borderColorHotel": {
        "&:hover": {
            borderColor: "#00efe8",
        },
        "&:focus": {
            borderColor: "#00efe8",
        },
    },
    "borderColorPackage": {
        "&:hover": {
            borderColor: "#EC7000",
        },
        "&:focus": {
            borderColor: "#EC7000",
        },
    },
    "borderColorCar": {
        "&:hover": {
            borderColor: "#D2DCDE66",
        },
        "&:focus": {
            borderColor: "#D2DCDE66",
        },
    },
    "borderColorCarsResort": {
        "&:hover": {
            borderColor: "#0033FF",
        },
        "&:focus": {
            borderColor: "#0033FF",
        },
    },

}));

export {cardStyles};
