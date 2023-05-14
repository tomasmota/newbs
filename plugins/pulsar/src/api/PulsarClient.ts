import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { Namespace, PulsarApi, TopicStats } from './types';
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

  async getNamespaces(tenant: string): Promise<Namespace[]> {
    const baseUrl = await this.discoveryApi.getBaseUrl('pulsar');
    const targetUrl = `${baseUrl}/${tenant}/namespaces`;

    const result: Response = await this.fetchApi.fetch(targetUrl);

    if (!result.ok) {
      throw await ResponseError.fromResponse(result);
    }

    const content = (await result.json()) as Namespace[];
    console.log(content);

    throw new Error('bla');
    // const data =  content as Namespace[];
    // console.log("namespaces: " + data[1].name);
    // return data;
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
