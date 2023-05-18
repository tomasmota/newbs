import { Client, Producer, Consumer } from 'pulsar-client';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runProducer(
  producer: Producer,
  sleepTimeMs: number = 50,
): Promise<void> {
  while (true) {
    await sleep(sleepTimeMs);
    await producer.send({
      data: Buffer.from(`Hello Pulsar`),
    });
  }
}

async function runConsumer(
  consumer: Consumer,
  sleepTimeMs: number = 50,
): Promise<void> {
  while (true) {
    const msg = await consumer.receive();
    // console.log(`Consumer Received message: ${msg.getData().toString()}, sleeping for ${sleepTimeMs} miliseconds`);
    consumer.acknowledge(msg);
    await sleep(sleepTimeMs);
  }
}

const TOPIC1 = 'first topic';
const TOPIC2 = 'second topic';

(async () => {
  const client = new Client({
    serviceUrl: 'pulsar://localhost:6650',
  });

  // Producer
  const producer1 = await client.createProducer({
    topic: TOPIC1,
    producerName: 'producer 1'
  });

  // Consumer 1
  const consumer1 = await client.subscribe({
    topic: TOPIC1,
    subscription: 'consumer 1',
  });
  console.log('first topic setup');

  // Producer
  const producer2 = await client.createProducer({
    topic: TOPIC2,
    producerName: 'producer 2'
  });

  // Consumer 2
  const consumer2 = await client.subscribe({
    topic: TOPIC2,
    subscription: 'consumer 2',
  });
  console.log('second topic setup');

  await Promise.all([
    runProducer(producer1, 50),
    runConsumer(consumer1, 100),
    runProducer(producer2, 200),
    runConsumer(consumer2, 800),
  ]);

  await client.close();
})();
