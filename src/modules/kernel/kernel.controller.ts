import Controller from '../../types/controller.class';
import { TypedRequest, TypedResponse } from '../../utils/express.type';
import { KernelResponse } from './kernel.response';

export default class KernelController extends Controller {
  public path = '/kernel';

  protected mountRoutes() {
    this.router.get('/heart', this.heart.bind(this));
  }

  private heart(req: TypedRequest<any>, res: TypedResponse<KernelResponse.Heart>): void {
    res.json({ alive: true });
  }
}
