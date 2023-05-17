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

export type TopicStats = {
  msgRateIn: number;
  msgRateOut: number;
  msgInCounter: number;
  averageMsgSize: number;
};

export type PulsarApi = {
  getAllTopics(): Topic[];
  getTopicStats(tenant: string, namespace: string, topic: string): Promise<TopicStats>;
  syncTopics(): Promise<void>;
};

