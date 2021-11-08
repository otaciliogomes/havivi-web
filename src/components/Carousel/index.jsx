import React from "react";
import Carousel from "./Carousel";
import { CarouselProvider } from "./ContextCarousel";


const CarouselComponent = (props) => {
    return (
        <CarouselProvider>
            <Carousel produto={props.produto}/>
        </CarouselProvider>

    );

};

export { CarouselComponent };
