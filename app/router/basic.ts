import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { controller } = app;
  const mapping = {
    'GET /bg_bing': controller.basic.fetchBingBackground,
    'GET /acg_base_config': controller.basic.getBaseConfig
  };
  const subRouter = new SubRouter(app, '/basic');
  subRouter.addMapping(mapping);
};
