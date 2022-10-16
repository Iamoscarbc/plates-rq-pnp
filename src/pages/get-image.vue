<template>
  <div>
    <h1>Make your own "Teachable Machine" using Transfer Learning with MobileNet v3 in TensorFlow.js using saved graph model from TFHub.</h1>

    <p id="status">{{ status }}</p>

    <video id="webcam" autoplay muted :srcObject.prop="video.srcObject"></video>

    <v-btn id="enableCam" @click="enableCam()" :class="!!video.srcObject ? 'removed' : ''">Enable Webcam</v-btn>
    <v-btn class="dataCollector" data-1hot="0" data-name="Class 1" @mousedown="gatherDataForClass(0)" @mouseup="gatherDataForClass(0)">Gather Class 1 Data</v-btn>
    <v-btn class="dataCollector" data-1hot="1" data-name="Class 2" @mousedown="gatherDataForClass(1)" @mouseup="gatherDataForClass(1)">Gather Class 2 Data</v-btn>
    <v-btn id="train" @click="trainAndPredict()">Train &amp; Predict!</v-btn>
    <v-btn id="reset" @click="reset()">Reset</v-btn>
  </div>
</template>

<script>
const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
const STOP_DATA_GATHER = -1;

let examplesCount = [];
let VIDEO

import * as tf from '@tensorflow/tfjs';

export default {
    name: 'GetImage',
    layout: 'auth',
    data: () => ({
        status: 'Awaiting TF.js load',
        video:{
            srcObject: null,
            playing: false
        },
        mobilenet: undefined,
        classNames: ["Class 1", "Class 2"],
        gatherDataState: STOP_DATA_GATHER,
        predict: false,
        model: null,
        trainingDataInputs: [],
        trainingDataOutputs: []
    }),
    methods: {
        async enableCam(){
            if (this.hasGetUserMedia) {
                let _this = this
                // getUsermedia parameters.
                const constraints = {
                    video: true,
                    width: 640,
                    height: 480
                };

                // Activate the webcam stream.
                navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                    _this.video.srcObject = stream;
                    _this.video.playing = true
                });
            } else {
                console.warn('getUserMedia() is not supported by your browser');
            }
        },
        async trainAndPredict(){
            let _this = this
            this.predict = false;
            tf.util.shuffleCombo(this.trainingDataInputs, this.trainingDataOutputs);
            let outputsAsTensor = tf.tensor1d(this.trainingDataOutputs, 'int32');
            let oneHotOutputs = tf.oneHot(outputsAsTensor, _this.classNames.length);
            let inputsAsTensor = tf.stack(this.trainingDataInputs);

            let results = await this.model.fit(inputsAsTensor, oneHotOutputs, {shuffle: true, batchSize: 5, epochs: 10,
                callbacks: {onEpochEnd: _this.logProgress } });

            outputsAsTensor.dispose();
            oneHotOutputs.dispose();
            inputsAsTensor.dispose();
            this.predict = true;
            this.predictLoop();
        },
        predictLoop() {
            if (this.predict) {
                let _this = this
                tf.tidy(function() {
                    let videoFrameAsTensor = tf.browser.fromPixels(VIDEO).div(255);
                    let resizedTensorFrame = tf.image.resizeBilinear(videoFrameAsTensor,[MOBILE_NET_INPUT_HEIGHT,
                        MOBILE_NET_INPUT_WIDTH], true);

                    let imageFeatures = _this.mobilenet.predict(resizedTensorFrame.expandDims());
                    let prediction = _this.model.predict(imageFeatures).squeeze();
                    let highestIndex = prediction.argMax().arraySync();
                    let predictionArray = prediction.arraySync();

                    _this.status = 'Prediction: ' + _this.classNames[highestIndex] + ' with ' + Math.floor(predictionArray[highestIndex] * 100) + '% confidence';
                });

                window.requestAnimationFrame(this.predictLoop);
            }
        },
        logProgress(epoch, logs) {
            console.log('Data for epoch ' + epoch, logs);
        },
        async reset(){
            this.predict = false;
            examplesCount.length = 0;
            for (let i = 0; i < this.trainingDataInputs.length; i++) {
                this.trainingDataInputs[i].dispose();
            }
            this.trainingDataInputs.length = 0;
            this.trainingDataOutputs.length = 0;
            this.status = 'No data collected';

            console.log('Tensors in memory: ' + tf.memory().numTensors);
        },
        async gatherDataForClass(param) {
            let classNumber = parseInt(param);
            this.gatherDataState = (this.gatherDataState === STOP_DATA_GATHER) ? classNumber : STOP_DATA_GATHER;
            this.dataGatherLoop();
        },
        dataGatherLoop() {
            if (this.video.playing && this.gatherDataState !== STOP_DATA_GATHER) {
                let _this = this
                let imageFeatures = tf.tidy(function() {
                let videoFrameAsTensor = tf.browser.fromPixels(VIDEO);
                let resizedTensorFrame = tf.image.resizeBilinear(videoFrameAsTensor, [MOBILE_NET_INPUT_HEIGHT,
                    MOBILE_NET_INPUT_WIDTH], true);
                let normalizedTensorFrame = resizedTensorFrame.div(255);
                    return _this.mobilenet.predict(normalizedTensorFrame.expandDims()).squeeze();
                });

                this.trainingDataInputs.push(imageFeatures);
                this.trainingDataOutputs.push(this.gatherDataState);

                // Intialize array index element if currently undefined.
                if (examplesCount[this.gatherDataState] === undefined) {
                    examplesCount[this.gatherDataState] = 0;
                }
                examplesCount[this.gatherDataState]++;

                this.status= '';
                for (let n = 0; n < _this.classNames.length; n++) {
                    _this.status += _this.classNames[n] + ' data count: ' + examplesCount[n] + '. ';
                }
                window.requestAnimationFrame(this.dataGatherLoop);
            }
        },
        async loadMobileNetFeatureModel(){
            const URL =
                'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1';

            this.mobilenet = await tf.loadGraphModel(URL, {fromTFHub: true});
            this.status = 'MobileNet v3 loaded successfully!';

            let _this = this

            // Warm up the model by passing zeros through it once.
            tf.tidy(function () {
                let answer = _this.mobilenet.predict(tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3]));
                console.log(answer.shape);
            });
        },
        async defineModel(){
            this.model = tf.sequential();
            this.model.add(tf.layers.dense({inputShape: [1024], units: 128, activation: 'relu'}));
            this.model.add(tf.layers.dense({units: this.classNames.length, activation: 'softmax'}));

            this.model.summary();

            // Compile the model with the defined optimizer and specify a loss function to use.
            this.model.compile({
                // Adam changes the learning rate over time which is useful.
                optimizer: 'adam',
                // Use the correct loss function. If 2 classes of data, must use binaryCrossentropy.
                // Else categoricalCrossentropy is used if more than 2 classes.
                loss: (this.classNames.length === 2) ? 'binaryCrossentropy': 'categoricalCrossentropy',
                // As this is a classification problem you can record accuracy in the logs too!
                metrics: ['accuracy']
            });
        }
    },
    computed: {
        hasGetUserMedia() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        }
    },
    async mounted(){
        await this.loadMobileNetFeatureModel()
        await this.defineModel()
        VIDEO = document.getElementById('webcam')
    }
}
</script>

<style>
h1 {
  font-style: italic;
  color: #FF6F00;
}

video {
  clear: both;
  display: block;
  margin: 10px;
  background: #000000;
  width: 640px;
  height: 480px;
}

button {
  padding: 10px;
  float: left;
  margin: 5px 3px 5px 10px;
}

.removed {
  display: none;
}

#status {
  font-size:150%;
}
</style>