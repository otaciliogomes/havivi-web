import { makeStyles, Theme } from "@material-ui/core";


const carouselStyles = makeStyles<Theme>(theme => {

    return ({
        root: {
            display: "flex",
            width: "630px",
            height: "380",
            // marginRight: "100px",
            // marginLeft: "100px",
            background: "#fafafa",
            position: "relative",
            "z-index": 1,
            [theme.breakpoints.down("sm")]: {
                width: "100%"
            }
        },
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            overflow: "hidden",
            width: "618px",
            "z-index": 1,
            marginLeft: 0,
            [theme.breakpoints.down("sm")]: {
                overflowX: "scroll",
                overflow: "visible",
                width: "100%",
            }
        },
        divCards: {
            gridArea: "carousel",
            display: "flex",
            background: "transparent",
            height: "380",
            width: "622px",
            transition: "0.7s",
            // TransitionDelay: "0.1s",
        },
        buttonCarouselRight: {
            position: "absolute",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            right: "-6px",
            top: "48%",
            cursor: "pointer",
            background: "#BBB",
            backgroundColor: "#FFF",
            "z-index": 98,
            "&:focus": {
                border: "1px solid #000"
            },
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        },
        buttonCarouselLeft: {
            position: "absolute",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            left: "-6px",
            top: "48%",
            cursor: "pointer",
            background: "#BBB",
            "z-index": 99,
            backgroundColor: "#FFF",
            "&:focus": {
                border: "1px solid #000"
            },
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        }

    });
});

export { carouselStyles };
