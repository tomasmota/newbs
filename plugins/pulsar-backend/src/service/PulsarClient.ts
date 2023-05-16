import { Config } from '@backstage/config';
import { PulsarApi, Namespace, Topic } from './types';
import fetch from 'cross-fetch';

export class PulsarClient implements PulsarApi {
  private baseUrl: string;
  private topics: Topic[];

  constructor(config: Config) {
    this.baseUrl = config.getString('pulsar.baseUrl');
    this.topics = [];
  }

  getAllTopics = (): Topic[] => {
    return this.topics;
  };

  async getNamespaces(tenant: string): Promise<Namespace[]> {
    console.log('fetching all namespaces');
    const url = `${this.baseUrl}/admin/v2/namespaces/${tenant}`;

    const response = await fetch(url);

    if (response.ok) {
      const nsArray = (await response.json()) as string[];
      return nsArray.map(n => ({
        name: n.split('/')[1],
        tenant: tenant,
      }));
    } else {
      throw new Error('Failed to fetch Pulsar topic stats');
    }
  }

  // Fetches all topics in all namespaces. For now assume there is only the public tenant
  // TODO: Instead of fetching every single topic, only fetch topics used by services in the catalog
  async syncTopics(): Promise<void> {
    console.log('Fetching all topics');
    const namespaces = await this.getNamespaces('public');
    const topics = await Promise.all(
      namespaces.map(async ns => {
        const topics = await this.getTopics(ns.tenant, ns.name);
        return topics;
      }),
    ).then(res => res.flat());

    this.topics = topics;
  }

  async getTopics(tenant: string, namespace: string): Promise<Topic[]> {
    const url = `${this.baseUrl}/admin/v2/persistent/${tenant}/${namespace}`;

    const response = await fetch(url);

    if (response.ok) {
      const topics = (await response.json()) as string[];
      return topics.map(t => {
        const index = t.lastIndexOf('/'); // Topic names in this list have the following format: "persistent://public/default/my-topic"
        const name = t.substring(index + 1);
        return {
          fullName: t,
          name: name,
          tenant: tenant,
          namespace: namespace,
          persistent: true,
        };
      });
    } else {
      throw new Error('Failed to fetch Pulsar topic stats');
    }
  }
}
