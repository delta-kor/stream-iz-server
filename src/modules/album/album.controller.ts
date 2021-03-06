import Controller from '../../types/controller.class';
import { Deserialize } from '../../types/deserialize.type';
import AsyncHelper from '../../utils/async-helper.util';
import DtoHelper from '../../utils/dto-helper.util';
import { TypedRequest, TypedResponse } from '../../utils/express.type';
import ValidateHelper from '../../utils/validate-helper.util';
import Album from './album.interface';
import AlbumService from './album.service';
import UploadDto from './dto/upload.dto';
import ViewDto from './dto/view.dto';

export default class AlbumController extends Controller {
  public path: string = '/album';
  private albumService: AlbumService = new AlbumService();

  protected mountRoutes(): void {
    this.router.post('/upload', ValidateHelper(UploadDto), AsyncHelper(this.upload.bind(this)));
    this.router.post('/view', ValidateHelper(ViewDto), AsyncHelper(this.view.bind(this)));
  }

  private async upload(
    req: TypedRequest<DtoHelper<UploadDto>>,
    res: TypedResponse<Deserialize<Album>>
  ): Promise<void> {
    const album = await this.albumService.upload(req.body);
    res.json(album.deserialize());
  }

  private async view(
    req: TypedRequest<DtoHelper<ViewDto>>,
    res: TypedResponse<Deserialize<Album>>
  ): Promise<void> {
    const album = await this.albumService.view(req.body.uuid);
    res.json(album.deserialize());
  }
}
