import { Model, model, Schema } from 'mongoose';
import { Deserialize } from '../../types/deserialize.type';
import uuid from '../../utils/uuid.util';
import Music from './music.interface';

export interface MusicModel extends Model<Music> {
  getMusicByUUID(uuid: string): Promise<Music | null>;
}

export const MusicSchema = new Schema<Music>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(16) },
  title: { type: String, required: true },
  album_id: { type: String, required: true },
  genie_id: { type: String, required: true },
  yt_id: { type: String, required: true },
  isTitle: { type: Boolean, required: true },
  lyrics: { type: Object, required: true },
  mv: { type: Schema.Types.Mixed, required: true, default: () => false },
  member: { type: [String], required: true, default: () => [] },
  length: { type: Number, required: true },
});

MusicSchema.static('getMusicByUUID', function (uuid: string): Promise<Music | null> {
  return MusicModel.findOne({ uuid }).exec();
});

MusicSchema.method('deserialize', function (this: Music): Deserialize<Music> {
  return {
    uuid: this.uuid,
    title: this.title,
    album_id: this.album_id,
    isTitle: this.isTitle,
    lyrics: this.lyrics,
    mv: this.mv,
    member: this.member,
  };
});

const MusicModel = model<Music, MusicModel>('music', MusicSchema);
export default MusicModel;
