# backstage pulsar plugin

Welcome to the pulsar plugin!

## Development setup (WIP)

- assuming devenv.sh is installed, run 'devenv up' in one terminal, which starts pulsar and filling up a test topic, and run 'dev' in a devenv shell.
- Go into a Component that has the pulsar annotation ('''backstage.io/pulsar-topic: my-topic''') pointing to this topic and go into the Pulsar tab

## Data to show
- Topics used by a given producer or consumer
- Which other producers/consumers are using that topic
- Backlog of messages
- Configuration of the topic (TTL, Retention, etc..)
- Rate of messages coming in and out of the topic, also broken down by producer/consumer

## TODO

- Figure out authentication
- Make it look nice

## Assumptions for MVP

- only look at namespaces and topics in 'public' tenant
- only consider persistent topics

