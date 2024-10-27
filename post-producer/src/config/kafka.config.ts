import { Admin, Kafka, logLevel, Producer } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private producer: Producer;
    private admin: Admin;   
    private broker: string;
    
    constructor() {
        this.broker = process.env.KAFKA_BROKERS || 'localhost:9092'
        this.kafka = new Kafka({
            clientId: 'post-producer',
            brokers: [this.broker],
            logLevel: logLevel.ERROR
        });
        this.producer = this.kafka.producer();
        this.admin = this.kafka.admin();
    }

    async connect(): Promise<void>{
        try {
            await this.producer.connect();
            await this.admin.connect();
            console.log('Kafka connected');
        } catch (error) {
            console.error('Error connecting kafka: ', error);
        }
    }

    async createTopic(topic: string): Promise<void>{
        try {
            await this.admin.createTopics({
                topics: [{topic}]
            })
            console.log('Topic created');
        } catch (error) {
            console.error('Error creating topic: ', error);
        }
    }

    async sentToTopic(topic: string, message: string): Promise<void>{
        try {
            await this.producer.send({
                topic,
                messages: [{value: message}]
            })
            console.log('Message sent to topic: ', topic);
        } catch (error) {
            console.error('Error sent to topic: ', error);
        }
    }

    async disconnect(): Promise<void>{
        try {
            this.producer.disconnect();
            this.admin.disconnect();
            console.log('Kafka discunnected: ');
        } catch (error) {
            console.error('Error disconnecting from kafka: ', error);
        }
    }
    
}

export default new KafkaConfig();