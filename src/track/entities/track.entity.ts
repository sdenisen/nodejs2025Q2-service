import { v4 as uuidv4 } from 'uuid';
export class Track {
  public readonly id: string;
  constructor(
    public name: string,
    public artistId: string | null,
    public albumId: string | null,
    public duration: number,
  ) {
    this.id = uuidv4();
  }
}
