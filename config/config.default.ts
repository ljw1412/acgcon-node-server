import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    jwt: { secret: 'acgcon' },
    session: {
      key: 'ACGCON_SESSION_TOKEN',
      maxAge: 7 * 24 * 3600 * 1000
    },
    logger: { outputJSON: true },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/acgcon',
        options: {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        }
      }
    }
  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581310668696_3264';

  // add your egg config in here
  config.middleware = [];

  config.cdnDomain = '';

  config.onerror = {
    json(err, ctx) {
      ctx.body = { message: err.message, status: ctx.status };
    }
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
