import { SolrClientParams } from 'solr-client/dist/lib/types';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type SolrModuleOptions = SolrClientParams & {
  auth?: {
    basic?: {
      username: string;
      password: string;
    }
  }
}

export interface SolrOptionsFactory {
  createSolrOptions(): Promise<SolrModuleOptions> | SolrModuleOptions;
}

export interface SolrModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<SolrOptionsFactory>;
  useClass?: Type<SolrOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<SolrModuleOptions> | SolrModuleOptions;
  inject?: any[];
}
