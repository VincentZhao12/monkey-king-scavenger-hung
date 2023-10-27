import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import WebcamPredictor from '../components/WebcamPredictor';

interface GameProps {}

const Game: FC<GameProps> = () => {
    const { item } = useParams();
    return (
        <>
            {item}
            <WebcamPredictor onPredict={(res) => console.log(res)} />
        </>
    );
};

export default Game;
