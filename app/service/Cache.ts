import { Service } from 'egg';

export default class GenTokenService extends Service {
  public async list({ type, count, keyword }: any) {
    const { app } = this;
    const match = type === 'all' ? `*${keyword}*` : `${type}:*${keyword}*`;
    const stream = app.redis.scanStream({ match, count });
    return await new Promise((resolve, reject) => {
      const list: any[] = [];
      stream.on('data', function(resultKeys) {
        for (let i = 0; i < resultKeys.length; i++) {
          list.push(resultKeys[i]);
        }
      });
      stream.on('end', function() {
        resolve(list);
      });
      stream.on('error', function(error) {
        reject(error);
      });
    });
  }

  public async findByKey(key: string) {
    const { app } = this;
    return await app.redis.get(key);
  }

  public async deleteByKey(key: string) {
    const { app } = this;
    return await app.redis.del(key);
  }
}
