import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import { LayersModel } from '@tensorflow/tfjs';
import { predictionValues } from '../constants';

interface WebcamPredictorProps {
    onPredict: (res: string) => any;
}

const WebcamPredictor: FC<WebcamPredictorProps> = ({ onPredict }) => {
    const cameraRef = useRef<null | Webcam>(null);
    const [img, setImg] = useState<any>();
    const [model, setModel] = useState<LayersModel | null>(null);

    useEffect(() => {
        loadModel().then(() => console.log('model loaded'));
    }, []);

    const loadModel = async () => {
        let model = null;
        try {
            model = await tf.loadLayersModel('../model/model.json');
        } catch (e) {
            console.log(e);
        }

        setModel(model);
    };

    const createHTMLImageElement = (imageSrc: any) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imageSrc;
            img.width = 180;
            img.height = 180;
            img.onload = () => resolve(img);
        });
    };

    const capture = useCallback(async () => {
        if (!model) {
            console.log('no model');
            return;
        }
        const imageSrc = cameraRef.current?.getScreenshot();
        setImg(imageSrc);

        const image: any = await createHTMLImageElement(imageSrc);

        const tensorImg = tf.browser.fromPixels(image).toFloat().expandDims(0);

        const result: any = model?.predict(tensorImg);

        if (!result) return;

        console.log(tensorImg.shape);
        console.log(result.dataSync());

        const predictions = result.dataSync();
        const predicted_index = result?.as1D().argMax().dataSync()[0];

        const confidence = Math.round(predictions[predicted_index] * 100);

        onPredict(predictionValues[predicted_index]);
        // else onPredict('none');
    }, [cameraRef, model, onPredict]);
    return img ? (
        <div className="webcam">
            <img src={img} alt="webcam pic" />
            <button
                onClick={() => {
                    setImg(undefined);
                    console.log('klafjsdlf');
                }}
            >
                retake pic
            </button>
        </div>
    ) : (
        <div className="webcam">
            <Webcam ref={cameraRef} />
            <button onClick={capture}>take pic</button>
        </div>
    );
};

export default WebcamPredictor;
