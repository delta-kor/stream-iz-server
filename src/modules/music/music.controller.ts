import Controller from '../../types/controller.class';
import { Deserialize } from '../../types/deserialize.type';
import AsyncHelper from '../../utils/async-helper.util';
import DtoHelper from '../../utils/dto-helper.util';
import { TypedRequest, TypedResponse } from '../../utils/express.type';
import ValidateHelper from '../../utils/validate-helper.util';
import UploadDto from './dto/upload.dto';
import ViewDto from './dto/view.dto';
import Music from './music.interface';
import MusicService from './music.service';

export default class MusicController extends Controller {
  public path: string = '/music';
  public musicService: MusicService = new MusicService();

  protected mountRoutes(): void {
    this.router.post('/upload', ValidateHelper(UploadDto), AsyncHelper(this.upload.bind(this)));
    this.router.post('/view', ValidateHelper(ViewDto), AsyncHelper(this.view.bind(this)));
  }

  private async upload(
    req: TypedRequest<DtoHelper<UploadDto>>,
    res: TypedResponse<Deserialize<Music>>
  ): Promise<void> {
    const music = await this.musicService.upload(req.body);
    res.json(music.deserialize());
  }

  private async view(
    req: TypedRequest<DtoHelper<ViewDto>>,
    res: TypedResponse<Deserialize<Music>>
  ): Promise<void> {
    const music = await this.musicService.view(req.body.uuid);
    res.json(music.deserialize());
  }
}
