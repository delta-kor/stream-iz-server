import 'dotenv/config';
import App from './app';
import AlbumController from './modules/album/album.controller';
import MusicController from './modules/music/music.controller';
import Controller from './types/controller.class';

const port = parseInt(process.env.PORT!);
const controllers: Controller[] = [new AlbumController(), new MusicController()];

const app = new App(port, controllers);
app.listen((port: number) => {
  console.log(`Started server in port ${port}`);
});
