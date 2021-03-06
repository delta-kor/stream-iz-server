import MongoStore from 'connect-mongo';
import cors from 'cors';
import express, { Application, json, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import HttpException from './exceptions/http.exception';
import NotFoundException from './exceptions/not-found.exception';
import Controller from './types/controller.class';
import OpenGraph from './utils/open-graph.util';

export default class App {
  private readonly port: number;
  private readonly app: Application;

  constructor(port: number, controllers: Controller[]) {
    this.port = port;
    this.app = express();
    this.connectDatabase();
    this.mountMiddlewares();
    this.mountControllers(controllers);
    this.mountErrorHandling();
  }

  public listen(callback: (port: number) => void): void {
    this.app.listen(this.port, () => callback(this.port));
  }

  private connectDatabase(): void {
    mongoose
      .connect(process.env.DB_PATH!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log('Connected to database'));
  }

  private mountMiddlewares(): void {
    this.app.set('json spaces', 2);

    this.app.use(cors({ origin: 'http://lt2.kr' }));
    this.app.use(json());
    this.app.use(
      session({
        name: 'iz_one',
        resave: true,
        secret: process.env.SECRET!,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_PATH! }),
      })
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use(OpenGraph);
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
