import kafkaConfig from "../config/kafka.config";
import PostModel from "../model/posts"

export const postConsumer = async () => {
    const messages: any[] = [];
    let processing = false;

    try {
        await kafkaConfig.subscribeTopic('post')

        await kafkaConfig.consume(async(message) => {
            messages.push(message);
            console.log('Message Recieved in consumer!')
            if(messages.length > 100){
                // TODO - save bulk insertion
                processMessages();
            }
        })
        setInterval(processMessages, 5000)
    } catch (error) {
        console.log("Some Error consuming.")
    }

    async function processMessages() {
        if(messages.length>0 && !processing){
            processing = true;
            const batchToProcess = [...messages]
            messages.length = 0;

            try {
                await PostModel.insertMany(batchToProcess, {ordered: false});
                console.log("Bulk Insertion completed");
            } catch (error) {
                console.log("Error inserting messages:", error);
                messages.push(...batchToProcess);
            } finally {
                processing = false;
            }

        }
        
    }
}

