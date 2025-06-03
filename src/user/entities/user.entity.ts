import { v4 as uuidv4 } from 'uuid';
export class User {
  readonly id: string;
  version: number;
  readonly createdAt: number;
  updatedAt: number;
  constructor(public login: string, public password: string) {
    this.id = uuidv4();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
