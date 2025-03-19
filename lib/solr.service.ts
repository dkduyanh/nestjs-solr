import { Inject, Injectable, Optional } from '@nestjs/common';
import { Client } from 'solr-client';
import { SOLR_MODULE_OPTIONS } from './solr.constants';
import { SolrClientParams } from 'solr-client/dist/lib/types';
import { SolrModuleOptions } from './interfaces';

@Injectable()
export class SolrService extends Client {
  constructor(
    @Optional() @Inject(SOLR_MODULE_OPTIONS) options: SolrModuleOptions,
  ) {
    super(options);
    if(options.auth){
      if(options.auth.basic){
        this.basicAuth(options.auth.basic.username, options.auth.basic.password);
      }
    }
  }
}
