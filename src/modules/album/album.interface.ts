import { Document } from 'mongoose';
import { Deserialize } from '../../types/deserialize.type';

export default interface Album extends Document {
  uuid: string;
  title: string;
  label: string[];
  release: Date;
  isKorean: boolean;
  isSingle: boolean;

  deserialize(): Deserialize<Album>;
}
