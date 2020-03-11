// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGenToken from '../../../app/service/GenToken';
import ExportRequest from '../../../app/service/Request';
import ExportUser from '../../../app/service/User';
import ExportBaikeFilter from '../../../app/service/Baike/Filter';

declare module 'egg' {
  interface IService {
    genToken: ExportGenToken;
    request: ExportRequest;
    user: ExportUser;
    baike: {
      filter: ExportBaikeFilter;
    }
  }
}
