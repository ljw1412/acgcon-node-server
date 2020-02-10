import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { controller } = app;
  const mapping = {
    'GET /bg_bing': controller.base.fetchBingBackground
  };
  const subRouter = new SubRouter(app, '/base');
  subRouter.addMapping(mapping);
};
