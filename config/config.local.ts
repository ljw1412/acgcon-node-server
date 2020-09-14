import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    security: {
      domainWhiteList: ['http://localhost:8080', 'http://localhost:8081']
    },
    cors: {
      // origin: ctx => ctx.header.origin,
      // 是否带cookie
      credentials: true
    }
  };
  return config;
};
