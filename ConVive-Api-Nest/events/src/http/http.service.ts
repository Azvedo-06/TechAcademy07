import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HttpService {
  private clients: Record<string, AxiosInstance>;

  constructor(cfg: ConfigService) { 
    this.clients = {
      users: axios.create({
        baseURL: cfg.get('USERS_API', 'http://service-users:3000'),
        timeout: 5000,
      }),
      spaces: axios.create({
        baseURL: cfg.get('SPACES_API', 'http://service-spaces:3000'),
        timeout: 5000,
      }),
    };
  }
  

  get users() {
    return this.clients.users;
  }

  get spaces() {
    return this.clients.spaces;
  }
}
