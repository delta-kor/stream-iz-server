import express, { Application } from 'express';

export default class App {
  private readonly port: number;
  private readonly app: Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }
}
