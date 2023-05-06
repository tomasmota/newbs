import { Config } from '@backstage/config';
import { PulsarApi, Namespace } from './types';
import fetch from 'cross-fetch';

export class PulsarClient implements PulsarApi {
  private baseUrl: string;

  constructor(config: Config) {
    console.log("constructor")
    this.baseUrl = config.getString('pulsar.baseUrl');
  }

  async getNamespaces(tenant: string): Promise<Namespace[]> {
    console.log("\n\nwtf\n\n")
    const url = `${this.baseUrl}/admin/v2/namespaces/${tenant}`;

    fetch(url).then(res => res.text()).then(t => console.log(t))
    console.log("\n\nwtf\n\n")
    const response = await fetch(url);

    if (response.ok) {
      const nsArray = (await response.json()) as string[];
      const namespaces: Namespace[] = nsArray.map(n => ({ name: n, tenant: tenant }));
      // console.log('NAMESPACES json: ' + response.json);
      // console.log('NAMESPACES arrayj: ' + nsArray);
      // console.log('NAMESPACES: ' + namespaces[1].name);
      return namespaces;
    } else {
      throw new Error('Failed to fetch Pulsar topic stats');
    }
  }
}
