import express, { Application, NextFunction, Request, Response } from 'express';
import HttpException from './exceptions/http.exception';
import NotFoundException from './exceptions/not-found.exception';
import Controller from './types/controller.class';

export default class App {
  private readonly port: number;
  private readonly app: Application;

  constructor(port: number, controllers: Controller[]) {
    this.port = port;
    this.app = express();
    this.mountControllers(controllers);
    this.mountErrorHandling();
  }

  public listen(callback: (port: number) => void): void {
    this.app.listen(this.port, () => callback(this.port));
  }

  private mountControllers(controllers: Controller[]): void {
    controllers.forEach(controller => this.app.use(controller.path, controller.router));
  }

  private mountErrorHandling(): void {
    this.app.use(() => {
      throw new NotFoundException();
    });

    this.app.use((error: HttpException | Error, req: Request, res: Response, _: NextFunction) => {
      let status = 500;
      let message = 'Something went wrong';
      let code = 0;

      if (error instanceof HttpException) {
        status = error.status;
        message = error.message;
        code = error.code;
      } else {
        console.error(error);
      }

      res.status(status);
      res.json({ status, message, code });
    });
  }
}
