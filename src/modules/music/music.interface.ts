import { Document } from 'mongoose';
import { Deserialize } from '../../types/deserialize.type';

export interface Lyrics {
  [key: number]: string;
}

export default interface Music extends Document {
  uuid: string;
  title: string;
  album_id: string;
  genie_id: string;
  yt_id: string;
  isTitle: boolean;
  lyrics: Lyrics;
  mv: string | null;
  member: string[];
  length: number;

  deserialize(): Deserialize<Music>;
}
