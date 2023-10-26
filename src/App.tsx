import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import { LayersModel } from '@tensorflow/tfjs';

function App() {
    const cameraRef = useRef<null | Webcam>(null);
    const [img, setImg] = useState<any>();
    const [model, setModel] = useState<LayersModel | null>(null);

    useEffect(() => {
        loadModel();
    }, []);

    const loadModel = async () => {
        const model = await tf.loadLayersModel('model/model.json');
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
        const imageSrc = cameraRef.current?.getScreenshot();

        const image: any = await createHTMLImageElement(imageSrc);

        const tensorImg = tf.browser.fromPixels(image).toFloat().expandDims(0);

        const result: any = model?.predict(tensorImg);

        console.log(tensorImg.shape);
        console.log(result.dataSync());

        if (!result) return [0, 0];

        const predictions = result.dataSync();
        const predicted_index = result?.as1D().argMax().dataSync()[0];

        const confidence = Math.round(predictions[predicted_index] * 100);
        console.log(confidence);
    }, [cameraRef]);
    return (
        <div className="App">
            hello word
            <Webcam ref={cameraRef} />
            <img src={img} alt="webcam pic" />
            <button onClick={capture}>take pic</button>
        </div>
    );
}

export default App;
