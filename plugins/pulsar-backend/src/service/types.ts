export type Namespace = {
  tenant: string;
  name: string;
}

export type Topic = {
  namespace: string;
  name: string;
}

export type PulsarApi = {
  getAllTopics(): Promise<Topic[]>;
  getNamespaces(tenant: string): Promise<Namespace[]>;
};
