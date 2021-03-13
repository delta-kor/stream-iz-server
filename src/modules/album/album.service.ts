import UnauthorizedException from '../../exceptions/unauthorized.exception';
import { Deserialize } from '../../types/deserialize.type';
import DtoHelper from '../../utils/dto-helper.util';
import Music from '../music/music.interface';
import MusicModel from '../music/music.model';
import Album, { AlbumFetchData } from './album.interface';
import AlbumModel from './album.model';
import UploadDto from './dto/upload.dto';
import NoAlbumException from './exception/no-album.exception';

export default class AlbumService {
  public async upload(data: DtoHelper<UploadDto>): Promise<Album> {
    if (data.key !== process.env.SECRET) throw new UnauthorizedException();

    const album = new AlbumModel({
      title: data.title,
      label: data.label,
      release: new Date(data.release),
      isKorean: data.isKorean,
      isSingle: data.isSingle,
    });
    await album.save();
    return album;
  }

  public async view(uuid: string): Promise<Album> {
    const album = await AlbumModel.getAlbumByUUID(uuid);
    if (!album) throw new NoAlbumException();
    return album;
  }

  public async fetch(korean: boolean, single: boolean): Promise<AlbumFetchData[]> {
    const result: AlbumFetchData[] = [];
    const albums = await AlbumModel.find({ isSingle: single, isKorean: korean }).sort({
      release: 1,
    });

    for (const album of albums) {
      const musicData: Deserialize<Music>[] = [];
      const musics = await MusicModel.find({ album_id: album.uuid }).sort({ index: 1 });
      musicData.push(...musics.map(music => music.deserialize()));
      result.push({ album: album.deserialize(), musics: musicData });
    }

    return result;
  }
}
