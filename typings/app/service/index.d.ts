// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRequest from '../../../app/service/Request';
import ExportTag from '../../../app/service/Tag';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    request: ExportRequest;
    tag: ExportTag;
    user: ExportUser;
  }
}
