import UnauthorizedException from '../../exceptions/unauthorized.exception';
import DtoHelper from '../../utils/dto-helper.util';
import UploadDto from './dto/upload.dto';
import NoMusicException from './exception/no-music.exception';
import Music from './music.interface';
import MusicModel from './music.model';

export default class MusicService {
  public async upload(data: DtoHelper<UploadDto>): Promise<Music> {
    if (data.key !== process.env.SECRET) throw new UnauthorizedException();

    const music = new MusicModel({
      title: data.title,
      album_id: data.album_id,
      genie_id: data.genie_id,
      yt_id: data.yt_id,
      isTitle: data.isTitle,
      lyrics: data.lyrics,
      length: data.length,
    });
    await music.save();
    return music;
  }

  public async view(uuid: string): Promise<Music> {
    const music = await MusicModel.getMusicByUUID(uuid);
    if (!music) throw new NoMusicException();
    return music;
  }
}
