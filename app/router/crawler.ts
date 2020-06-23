import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { controller } = app;

  const mapping = {
    'POST /start': controller.crawler.start
  };
  const subRouter = new SubRouter(app, '/crawler');
  subRouter.addMapping(mapping);
};
