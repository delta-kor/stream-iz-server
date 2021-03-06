import UnauthorizedException from '../../exceptions/unauthorized.exception';
import DtoHelper from '../../utils/dto-helper.util';
import Album from './album.interface';
import AlbumModel from './album.model';
import UploadDto from './dto/upload.dto';

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
}
