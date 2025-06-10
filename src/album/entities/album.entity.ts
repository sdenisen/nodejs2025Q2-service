import { v4 as uuidv4 } from 'uuid';

export class Album {
  readonly id: string;

  constructor(
    public name: string,
    public year: number,
    public artistId: string | null,
  ) {
    this.id = uuidv4();
  }
}
