"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducer = void 0;
const kafkajs_1 = require("kafkajs");
async function createProducer(producerName, message, topic) {
    // Configure the client to a seed broker
    const kafka = new kafkajs_1.Kafka({
        clientId: producerName,
        brokers: ['localhost:9092'],
    });
    // Create an instance of a producer on kafka broker
    const producer = kafka.producer();
    // Connect to the producer
    try {
        await producer.connect();
    }
    catch (error) {
        console.log(error);
    }
    // Write a message to producer
    try {
        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(message) }],
            //could also specify key [{ key: 'my-key', value: 'my-value'}],
            //other options: partition, timestamp, headers
            //acks: -1 all, 0 none, 1 just leader (default is -1)
            //timeout:
            //compression: 
        });
    }
    catch (error) {
        console.log(error);
    }
    // Disconnect from the producer
    producer.disconnect();
}
exports.createProducer = createProducer;
