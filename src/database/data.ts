import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favs } from 'src/favs/entities/favs.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export const users: User[] = [
  {
    id: '8ab2d882-13f2-4e6a-a505-ebf6f5a283c7',
    login: 'user1',
    password: 'password1',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '3fc1537b-95d6-4e89-8796-30e11986d67f',
    login: 'user2',
    password: 'password2',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'b299b41e-155f-4985-8960-1b0cc62a46d0',
    login: 'user3',
    password: 'password3',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const artists: Artist[] = [
  {
    id: '8ab2d882-13f2-4e6a-a505-ebf6f5a283c7',
    name: 'John Legend',
    grammy: true,
  },
  {
    id: '3fc1537b-95d6-4e89-8796-30e11986d67f',
    name: 'Beyoncé',
    grammy: true,
  },
  {
    id: 'b299b41e-155f-4985-8960-1b0cc62a46d0',
    name: 'Eminem',
    grammy: false,
  },
];

export const albums: Album[] = [
  {
    id: '9fcffb19-b0e7-4eaf-ab5c-62c6adb7f3f0',
    name: 'Bigger Love',
    year: 2020,
    artistId: '8ab2d882-13f2-4e6a-a505-ebf6f5a283c7',
  },
  {
    id: 'e787d7f2-5750-445f-975c-45a153b71f2b',
    name: 'Lemonade',
    year: 2021,
    artistId: '3fc1537b-95d6-4e89-8796-30e11986d67f',
  },
  {
    id: '2d40961a-71cb-4e46-8c6b-b3823ec729b3',
    name: 'Kamikaze',
    year: 2018,
    artistId: 'b299b41e-155f-4985-8960-1b0cc62a46d0',
  },
  {
    id: '88b68b14-2e91-4fb6-ac39-dfb018426d91',
    name: 'Get Lifted',
    year: 2004,
    artistId: '8ab2d882-13f2-4e6a-a505-ebf6f5a283c7',
  },
];

export const tracks: Track[] = [
  {
    id: 'b7b63b28-861d-4d63-8545-f963c37e7338',
    name: 'All of me',
    artistId: '8ab2d882-13f2-4e6a-a505-ebf6f5a283c7',
    albumId: '9fcffb19-b0e7-4eaf-ab5c-62c6adb7f3f0',
    duration: 294,
  },
  {
    id: '58d093d6-df33-4173-b69e-328059faa27b',
    name: 'Diva',
    artistId: '3fc1537b-95d6-4e89-8796-30e11986d67f',
    albumId: 'e787d7f2-5750-445f-975c-45a153b71f2b',
    duration: 293,
  },
  {
    id: '02697963-92a7-49a2-a592-b3cd0ad78025',
    name: 'Venom',
    artistId: 'b299b41e-155f-4985-8960-1b0cc62a46d0',
    albumId: '2d40961a-71cb-4e46-8c6b-b3823ec729b3',
    duration: 258,
  },
  {
    id: '522b66de-5b1f-4836-bf37-fee17fbf92f9',
    name: 'Actions',
    artistId: '8ab2d882-13f2-4e6a-a505-ebf6f5a283c7',
    albumId: '88b68b14-2e91-4fb6-ac39-dfb018426d91',
    duration: 264,
  },
];

export const userDb = new Map<string, User>(
  users.map((user) => [user.id, user]),
);

export const artistDb = new Map<string, Artist>(
  artists.map((artist) => [artist.id, artist]),
);

export const albumDb = new Map<string, Album>(
  albums.map((album) => [album.id, album]),
);

export const trackDb = new Map<string, Track>(
  tracks.map((track) => [track.id, track]),
);

export const favoriteDb: Favs = new Favs();
