# backstage pulsar plugin

Welcome to the pulsar plugin!

## Development setup (WIP)
- assuming devenv.sh is installed, run 'devenv up' in one terminal, which starts pulsar and filling up a test topic, and run 'dev' in a devenv shell.
- Go into a Component that has the pulsar annotation ('''backstage.io/pulsar-topic: my-topic''') pointing to this topic and go into the Pulsar tab

## TODO
- Figure out authentication
- Decide what data to show
- Make it look nice
- Allow showing information for several topics (perhaps select from a dropdown?) not sure how to put them in annotations
- Consider getting the producer and/or subscriber name instead of the topic name(s)

## Assumptions for MVP
- only look at namespaces and topics in 'public' tenant
- only consider persistent topics

## Questions
- Is information of both subscriptions and consumers? Or is it usually the case that 1 subscription = 1 consumer?
