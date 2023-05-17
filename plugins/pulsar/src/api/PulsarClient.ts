import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { PulsarApi, Topic, TopicStats } from './types';
import { ResponseError } from '@backstage/errors';

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

  async getTopics(): Promise<Topic[]> {
    const baseUrl = await this.discoveryApi.getBaseUrl('pulsar');
    const targetUrl = `${baseUrl}/topics`;

    const result: Response = await this.fetchApi.fetch(targetUrl);

    if (!result.ok) {
      throw await ResponseError.fromResponse(result);
    }

    const content = (await result.json()) as Topic[];
    return content;
  }

  async getTopicStats(
    tenant: string,
    namespace: string,
    topic: string,
  ): Promise<TopicStats> {
    const baseUrl = await this.discoveryApi.getBaseUrl('pulsar');
    const targetUrl = `${baseUrl}/${tenant}/${namespace}/${topic}/stats`;

    const result: Response = await this.fetchApi.fetch(targetUrl);
    const json = await result.json();
    const content = json as TopicStats;
    console.log("json content:")
    console.log(json)
    console.log("casted");
    console.log(content);

    if (!result.ok) {
      throw new Error(`${content}`);
    }

    return content;
  }
}
