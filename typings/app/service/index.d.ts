// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCache from '../../../app/service/Cache';
import ExportCrawler from '../../../app/service/Crawler';
import ExportGenToken from '../../../app/service/GenToken';
import ExportInformation from '../../../app/service/Information';
import ExportRequest from '../../../app/service/Request';
import ExportTag from '../../../app/service/Tag';
import ExportTagGroup from '../../../app/service/TagGroup';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    cache: AutoInstanceType<typeof ExportCache>;
    crawler: AutoInstanceType<typeof ExportCrawler>;
    genToken: AutoInstanceType<typeof ExportGenToken>;
    information: AutoInstanceType<typeof ExportInformation>;
    request: AutoInstanceType<typeof ExportRequest>;
    tag: AutoInstanceType<typeof ExportTag>;
    tagGroup: AutoInstanceType<typeof ExportTagGroup>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
