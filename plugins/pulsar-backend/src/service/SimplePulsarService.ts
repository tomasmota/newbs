import { ListTopicsResponse, PulsarService } from './types';

export class SimplePulsarService implements PulsarService {
  listTopics(): Promise<ListTopicsResponse> {
    throw new Error('Method not implemented.');
  }
}
