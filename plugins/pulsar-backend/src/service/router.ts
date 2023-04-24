import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

export interface RouterOptions {
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

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
