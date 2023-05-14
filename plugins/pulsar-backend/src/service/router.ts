import { errorHandler } from '@backstage/backend-common';
import { PluginTaskScheduler } from '@backstage/backend-tasks';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { PulsarClient } from './PulsarClient';
// import { PulsarClient } from './PulsarClient';

export interface RouterOptions {
  logger: Logger;
  config: Config;
  scheduler?: PluginTaskScheduler;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config, scheduler } = options;

  const pulsarClient = new PulsarClient(config);

  if (scheduler) {
    await scheduler.scheduleTask({
      id: 'pulsar-fetch-stats',
      frequency: { minutes: 5 },
      timeout: { minutes: 5 },
      initialDelay: { seconds: 1 },
      scope: 'global',
      fn: async () => {
        // 1: Find all consumer and producer names defined in annotations
        // 2: Fetch stats for all topics related to them
        // 3: Store those stats in DB
        console.log('\nRunning schedule');
        pulsarClient.syncTopics();
      },
    });
  }

  const router = Router();
  router.use(express.json());

  router.get('/:tenant/namespaces', (req, res) => {
    const tenant = req.params.tenant;
    logger.info(`fetching namespaces in '${tenant}' tenant`);
    // const namespaces = pulsarClient.getNamespaces(tenant);
    // res.json(namespaces);
    res.json({ this: 'that' });
  });

  router.get('/topics', (_, res) => {
    logger.info('fetching all topics');
    // const namespaces = pulsarClient.getNamespaces(tenant);
    // res.json(namespaces);
    console.log(pulsarClient.getAllTopics());
    res.json(pulsarClient.getAllTopics());
  });

  router.get('/:tenant/:namespace/:topic/stats', (req, res) => {
    const tenant = req.params.tenant;
    const namespace = req.params.namespace;
    const topic = req.params.topic;
    logger.info(`fetching stats for topic ${tenant}/${namespace}/${topic}`);
    res.json({ topicCount: 42 });
  });

  router.use(errorHandler());
  return router;
}
