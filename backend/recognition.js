// backend/recognition.js
const mobilenet = require('@tensorflow-models/mobilenet');
const tf = require('@tensorflow/tfjs-node'); // Sử dụng tfjs-node cho server

let model;

const loadModel = async () => {
  if (!model) {
    model = await mobilenet.load();
  }
  return model;
};

const classifyImage = async (imageBuffer) => {
  const model = await loadModel();
  const image = tf.node.decodeImage(imageBuffer);
  const predictions = await model.classify(image);
  return predictions[0].className;
};

module.exports = { classifyImage };
