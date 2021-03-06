import UnauthorizedException from '../../exceptions/unauthorized.exception';
import DtoHelper from '../../utils/dto-helper.util';
import Album from './album.interface';
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
}
