import { Admin, Kafka, logLevel, Consumer } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private consumer: Consumer;
    private broker: string;

    constructor() {
        this.broker = process.env.KAFKA_BROKERS || 'localhost:9092'
        this.kafka = new Kafka({
            clientId: 'post-consumer',
            brokers: [this.broker],
            logLevel: logLevel.ERROR
        });
        this.consumer = this.kafka.consumer({
            groupId: 'post-consumer'
        });
    }
    
    async subscribeTopic(topic: string): Promise<void>{
        try {
            await this.consumer.subscribe({
                topic,
                fromBeginning: true
            })
            console.log('Subscribed to Topic');
        } catch (error) {
            console.error('Error subscribing to topic: ', error);
        }
    }

    
    async consume(callback: (message: string) => void): Promise<void>{
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log('Message recieved in kafka consumer');
                    callback(JSON.parse(message?.value?.toString()!))
                }
            })
            console.log('Message consumed');
        } catch (error) {
            console.error('Error consuming message: ', error);
        }
    }

    async connect(): Promise<void>{
        try {
            await this.consumer.connect();
            console.log('Kafka connected');
        } catch (error) {
            console.error('Error connecting kafka: ', error);
        }
    }

    async disconnect(): Promise<void>{
        try {
            this.consumer.disconnect();
            console.log('Kafka discunnected: ');
        } catch (error) {
            console.error('Error disconnecting from kafka: ', error);
        }
    }
    
}

export default new KafkaConfig();