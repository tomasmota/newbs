import { errorHandler } from '@backstage/backend-common';
import { PluginTaskScheduler } from '@backstage/backend-tasks';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

export interface RouterOptions {
  logger: Logger;
  scheduler?: PluginTaskScheduler;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, scheduler } = options;

  if (scheduler){
    await scheduler.scheduleTask({
      id: 'pulsar-fetch-stats',
      frequency: {minutes: 10 },
      timeout: {minutes: 5 },
      initialDelay: { minutes: 1 },
      scope: "global",
      fn: async () => {
        console.log("\n\n\n\n\n\n\nFETCHING PULSAR STATS\n\n\n\n");
        // await linguistBackendApi.processEntities();
      },
    });
  }

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get(':tenant/:namespace/:topic/stats', (req, res) => {
    const tenant = req.params.tenant;
    const namespace = req.params.namespace;
    const topic = req.params.tenant;
    logger.info(`fetching stats for topic ${tenant}/${namespace}/${topic}`);
    res.json({ topicCount: 42 });
  });

  router.use(errorHandler());
  return router;
}
