export type Namespace = {
  tenant: string;
  name: string;
}

export type Topic = {
  tenant: string;
  namespace: string;
  persistent: boolean;
  name: string;
}

export type PulsarApi = {
  getAllTopics(): Promise<Topic[]>;
  getNamespaces(tenant: string): Promise<Namespace[]>;
};
