export type Namespace = {
  tenant: string;
  name: string;
}

// export type PulsarTopic = {
//   namespace: string;
//   name: string;
// }

export type PulsarApi = {
  getNamespaces(tenant: string): Promise<Namespace[]>;
};
