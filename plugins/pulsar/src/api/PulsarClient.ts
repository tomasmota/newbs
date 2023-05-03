import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { Namespace, PulsarApi, TopicStats } from './types';

/**
 * Options for creating a PulsarClient.
 *
 * @public
 */
export interface PulsarClientOptions {
  discoveryApi: DiscoveryApi;
  fetchApi: FetchApi;
}

export class PulsarClient implements PulsarApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;

  constructor(options: PulsarClientOptions) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi;
  }

  async getNamespaces(tenant: string): Promise<Namespace[]> {
    const baseUrl = await this.discoveryApi.getBaseUrl('pulsar');
    // const topicEndpoint = `${baseUrl}/${tenant}/${namespace}/${topic}/stats`;
    const targetUrl = `${baseUrl}/${tenant}/namespaces`;

    const result: Response = await this.fetchApi.fetch(targetUrl);
    const content = await result.json();

    if (!result.ok) {
      throw new Error(`${content}`);
    }

    const data = content as Namespace[];
    return data;
  }

  async getTopicStats(
    tenant: string,
    namespace: string,
    topic: string,
  ): Promise<TopicStats> {
    const baseUrl = await this.discoveryApi.getBaseUrl('pulsar');
    const targetUrl = `${baseUrl}/${tenant}/${namespace}/${topic}/stats`;

    const result: Response = await this.fetchApi.fetch(targetUrl);
    const content = result.json();

    if (!result.ok) {
      throw new Error(`${content}`);
    }

    return content;
  }
}
