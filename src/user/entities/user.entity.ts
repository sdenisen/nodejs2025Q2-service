import { v4 as uuidv4 } from 'uuid';
import { Exclude } from 'class-transformer';

export class User {
  readonly id: string;
  version: number;
  readonly createdAt: number;
  updatedAt: number;
  @Exclude()
  password: string;

  constructor(public login: string, password: string) {
    this.id = uuidv4();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.password = password;
  }
}
