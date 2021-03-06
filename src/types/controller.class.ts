import { Router } from 'express';

export default abstract class Controller {
  public abstract path: string;
  public router: Router = Router();

  constructor() {
    this.mountRoutes();
  }

  protected abstract mountRoutes(): void;
}
