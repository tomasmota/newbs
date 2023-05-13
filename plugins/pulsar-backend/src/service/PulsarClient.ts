import { Config } from '@backstage/config';
import { PulsarApi, Namespace, Topic } from './types';
import fetch from 'cross-fetch';

export class PulsarClient implements PulsarApi {
  private baseUrl: string;

  constructor(config: Config) {
    console.log('constructor');
    this.baseUrl = config.getString('pulsar.baseUrl');
  }

  async getNamespaces(tenant: string): Promise<Namespace[]> {
    console.log("fetching all namespaces");
    const url = `${this.baseUrl}/admin/v2/namespaces/${tenant}`;

    const response = await fetch(url);

    if (response.ok) {
      const nsArray = (await response.json()) as string[];
      console.log(nsArray)
      return nsArray.map(n => ({
        name: n.split("/")[1],
        tenant: tenant,
      }));
    } else {
      throw new Error('Failed to fetch Pulsar topic stats');
    }
  }

  // Fetches all topics in all namespaces. For now assume there is only the public tenant
  // TODO: Instead of fetching every single topic, only fetch topics used by services in the catalog
  async getAllTopics(): Promise<Topic[]> {
    console.log("Fetching all topics\n")
    const namespaces = await this.getNamespaces("public")
    console.log("\n\nNamespaces:")
    console.log(namespaces);
    const topics = namespaces.flatMap(
      async ns => {
        await this.getTopics(ns.tenant, ns.name)
      }
    )
    console.log(await Promise.all(topics));

    return [{name: "t", tenant: "that", namespace: "this", persistent: true}]
  }


  async getTopics(tenant: string, namespace: string): Promise<Topic[]> {
    console.log(`Fetching all topics in namespace ${namespace}`)
    const url = `${this.baseUrl}/admin/v2/persistent/${tenant}/${namespace}`;

    const response = await fetch(url);

    if (response.ok) {
      const topics = (await response.json()) as string[];
      return topics.map(t => {
        const index = t.lastIndexOf("/"); // Topic names in this list have the following format: "persistent://public/default/my-topic"
        const name = t.substring(index + 1);
        console.log(name);
        return {name: name, tenant: tenant, namespace: namespace, persistent: true}
      });
    } else {
      throw new Error('Failed to fetch Pulsar topic stats');
    }
  }
}
