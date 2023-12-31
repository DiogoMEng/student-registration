import express from 'express';
import dotenv from 'dotenv';
import { dirname, resolve } from 'path';

// ### ROUTES ###
import homeRouter from './src/routes/HomeRoutes';
import userRouter from './src/routes/UserRoutes';
import tokenRouter from './src/routes/TokenRoutes';
import studentRouter from './src/routes/StudentRoutes';
import photoRouter from './src/routes/PhotoRoutes';



import './src/database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded(
      {
        extended: true,
      },
    ));

    this.app.use(express.json())

    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRouter);
    this.app.use('/users/', userRouter)
    this.app.use('/tokens/', tokenRouter)
    this.app.use('/students/', studentRouter)
    this.app.use('/photos/', photoRouter)
  }
}

export default new App().app;
