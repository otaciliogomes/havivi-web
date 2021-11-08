import { makeStyles, Theme } from "@material-ui/core";

export const rootProd = makeStyles<Theme>(() => ({
    rootAir: {
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
            borderColor: "#0033FF",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        },
        "&:focus": {
            borderColor: "#0033FF",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        }
    },
    rootHotel: {
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
        }
    },
    rootPackage: {
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
            borderColor: "#EC7000",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        },
        "&:focus": {
            borderColor: "#EC7000",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        }
    },
    rootResort: {
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
            borderColor: "#007ab7",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        },
        "&:focus": {
            borderColor: "#007ab7",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        }
    },
    rootCar: {
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
            borderColor: "#D2DCDE66",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        },
        "&:focus": {
            borderColor: "#D2DCDE66",
            transition: "border-color .3s",
            "& $img": {
                transform: "scale(1.1)"
            },
        }
    }

}));
