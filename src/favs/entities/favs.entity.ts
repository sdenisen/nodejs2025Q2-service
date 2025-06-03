export class Favs {
  constructor(
    private artists: string[] = [],
    private albums: string[] = [],
    private tracks: string[] = [],
  ) {}

  get getArtists() {
    return this.artists;
  }

  get getAlbums() {
    return this.albums;
  }

  get getTracks() {
    return this.tracks;
  }

  addArtist(id: string) {
    this.artists.push(id);
  }

  addAlbum(id: string) {
    this.albums.push(id);
  }

  addTrack(id: string) {
    this.tracks.push(id);
  }

  deleteArtist(artistId: string) {
    this.artists = this.artists.filter((id) => id !== artistId);
  }

  deleteAlbum(albumId: string) {
    this.albums = this.albums.filter((id) => id !== albumId);
  }

  deleteTrack(trackId: string) {
    this.tracks = this.tracks.filter((id) => id !== trackId);
  }

  has(id: string, type: string): string {
    return this[type].find((itemId: string) => itemId === id);
  }
}

export const enum eFavs {
  artists = 'artists',
  albums = 'albums',
  tracks = 'tracks',
}
