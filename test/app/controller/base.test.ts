import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/base.test.ts', () => {
  it('should GET /base/bg_bing', async () => {
    const result = await app
      .httpRequest()
      .get('/base/bg_bing')
      .expect(200);
    assert(result.text.includes('images'));
  });
});
