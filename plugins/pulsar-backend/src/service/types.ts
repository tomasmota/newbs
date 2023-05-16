export type Namespace = {
  tenant: string;
  name: string;
};

export type Topic = {
  fullName: string;
  tenant: string;
  namespace: string;
  name: string;
  persistent: boolean;
};

export type PulsarApi = {
  getAllTopics(): Topic[];
  syncTopics(): Promise<void>;
  getNamespaces(tenant: string): Promise<Namespace[]>;
};
