export type Namespace = {
  tenant: string;
  name: string;
};

export type Topic = {
  tenant: string;
  namespace: string;
  persistent: boolean;
  name: string;
};

export type PulsarApi = {
  getAllTopics(): Topic[];
  syncTopics(): Promise<void>;
  getNamespaces(tenant: string): Promise<Namespace[]>;
};
