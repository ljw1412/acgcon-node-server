// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaikeFilter from '../../../app/model/BaikeFilter';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    BaikeFilter: ReturnType<typeof ExportBaikeFilter>;
    User: ReturnType<typeof ExportUser>;
  }
}
