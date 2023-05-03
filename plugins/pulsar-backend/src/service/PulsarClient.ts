import { Config } from '@backstage/config';
import { PulsarApi, Namespace } from './types';
import fetch from 'cross-fetch';

export class PulsarClient implements PulsarApi {
  private baseUrl: string;

  constructor(config: Config) {
    this.baseUrl = config.getString('pulsar.baseUrl');
  }

  async getNamespaces(tenant: string): Promise<Namespace[]> {
    const url = `${this.baseUrl}/admin/v2/namespaces/${tenant}`;

    const response = await fetch(url);

    if (response.ok) {
      const nsArray = (await response.json()) as string[];
      const namespaces = nsArray.map(n => ({ name: n, tenant: tenant }));
      console.log('NAMESPACES: ' + namespaces);
      return namespaces;
    } else {
      throw new Error('Failed to fetch Pulsar topic stats');
    }
  }
}
