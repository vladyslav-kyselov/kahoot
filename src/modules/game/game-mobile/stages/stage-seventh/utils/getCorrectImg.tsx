import React from "react";

const getImage = (src?: string) => {
    if (!src) return '';

    return (
        <img
            src={src}
            alt='QR code'
            loading="lazy"
        />)
};

const urls = {
    1: './../../../../../../public/first.PNG',
    2: './../../../../../../public/second.PNG',
    3: './../../../../../../public/third.PNG',
}

export const getCorrectImg = (place: number) => {
    if (place !== 3 && place !== 2 && place !== 1) return;

    return getImage(urls[place]);
}
