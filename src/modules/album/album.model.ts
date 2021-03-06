import { model, Schema } from 'mongoose';
import { Deserialize } from '../../types/deserialize.type';
import uuid from '../../utils/uuid.util';
import Album from './album.interface';

export const AlbumSchema = new Schema<Album>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(16) },
  title: { type: String, required: true },
  label: { type: [String], required: true },
  release: { type: Date, required: true },
  isKorean: { type: Boolean, required: true },
  isSingle: { type: Boolean, required: true },
});

AlbumSchema.method('deserialize', function (this: Album): Deserialize<Album> {
  return this;
});

const AlbumModel = model('album', AlbumSchema);
export default AlbumModel;
