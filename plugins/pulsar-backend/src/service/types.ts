export type ListTopicsResponse = {
  topics: string[];
};

/** @public */
export type PulsarService = {
  listTopics(): Promise<ListTopicsResponse>;
}
