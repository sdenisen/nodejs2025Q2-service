import { v4 as uuidv4 } from 'uuid';

export class Artist {
  public readonly id: string;

  constructor(public name: string, public grammy: boolean) {
    this.id = uuidv4();
  }
}
