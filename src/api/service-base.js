import { createClient } from './axios';
import magician from './magician';

export default class ServiceBase {
  constructor(endpoint, config) {
    this.endpoint = endpoint || '';
    this.r = createClient(this.endpoint, config);
    this.magician = magician;
  }
}
