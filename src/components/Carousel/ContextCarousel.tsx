import React, { createContext, useState } from "react";

interface ICorouselContext {
    onClickKeybord: boolean;
    setOnClickKeybord: (activ:boolean) => void;
    scrollCarousel: number;
    setScrollCarousel: (change:number) => void;
}

const CarouselContext = createContext<ICorouselContext>({} as ICorouselContext);

export const CarouselProvider: React.FC = ({ children }) => {
    const [onClickKeybord, setOnClickKeybord] = useState(true);
    const [scrollCarousel, setScrollCarousel] = useState(0);

    return (
        <CarouselContext.Provider value={{ onClickKeybord, setOnClickKeybord, scrollCarousel, setScrollCarousel }}>
            {children}
        </CarouselContext.Provider>
    );
};

export default CarouselContext;
