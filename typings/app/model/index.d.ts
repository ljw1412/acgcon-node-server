// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaikeTag from '../../../app/model/BaikeTag';

declare module 'egg' {
  interface IModel {
    BaikeTag: ReturnType<typeof ExportBaikeTag>;
  }
}
