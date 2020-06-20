// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportGenToken from '../../../app/service/GenToken';
import ExportRequest from '../../../app/service/Request';
import ExportTag from '../../../app/service/Tag';
import ExportTagGroup from '../../../app/service/TagGroup';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    genToken: AutoInstanceType<typeof ExportGenToken>;
    request: AutoInstanceType<typeof ExportRequest>;
    tag: AutoInstanceType<typeof ExportTag>;
    tagGroup: AutoInstanceType<typeof ExportTagGroup>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
