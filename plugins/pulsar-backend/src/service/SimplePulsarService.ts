import { ListTopicsResponse, PulsarService } from './types';

export class SimplePulsarService implements PulsarService {
  topicStats(): Promise<ListTopicsResponse> {
      throw new Error('Method not implemented.');
  }
  listTopics(): Promise<ListTopicsResponse> {
    throw new Error('Method not implemented.');
  }
}
