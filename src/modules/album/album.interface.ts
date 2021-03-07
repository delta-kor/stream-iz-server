import { Document } from 'mongoose';
import { Deserialize } from '../../types/deserialize.type';
import Music from '../music/music.interface';

export interface AlbumFetchData {
  album: Deserialize<Album>;
  musics: Deserialize<Music>[];
}

export default interface Album extends Document {
  uuid: string;
  title: string;
  label: string[];
  release: Date;
  isKorean: boolean;
  isSingle: boolean;

  deserialize(): Deserialize<Album>;
}
