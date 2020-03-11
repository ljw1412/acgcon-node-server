// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaikeFilter from '../../../app/model/BaikeFilter';
import ExportBaikeTag from '../../../app/model/BaikeTag';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    BaikeFilter: ReturnType<typeof ExportBaikeFilter>;
    BaikeTag: ReturnType<typeof ExportBaikeTag>;
    User: ReturnType<typeof ExportUser>;
  }
}
