# nestjs-solr

## Description

Solr module for Nestjs.

## Usage

Register `SolrModule`:

```typescript
import { SolrModule } from 'nest-solr';

@Module({
  imports: [
    SolrModule.register({
      host: 'localhost',
      port: '8983',
      secure: false,
      core: 'mycore',
    }),
  ],
})
export class AppModule {}
```

Inject `SolrService`:

```typescript
import { SolrService } from 'nest-solr';

@Injectable()
export class SearchService {
  constructor(private readonly solrService: SolrService) {}
}
```

### Async options

```typescript
@Module({
  imports: [
    SolrModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get('SOLR_HOST'),
        port: configService.get('SOLR_PORT'),
        secure: configService.get('SOLR_SECURE'),
        core: 'mycore',
      }),
      inject: [ConfigService],
    }),
  ],
})
```

## Examples
```typescript
// Add a new document
const obj = await this.solrService.add({ id : 12, title_t : 'Hello', status: '1' });
console.log('Solr response:', obj);

// Search
const solrQuery = this.solrService
  .query()
  .q({ title_t: 'Hello' })
  .matchFilter('status', '1') //the fq (Filter Query)
  .fl(['title_t']) //the fl (field List)
  .start(0) //the offset where the set of returned documents should begin
  .rows(10) //the maximum number of documents returned
;
const ret: SearchResponse<any> = await this.solrService.search(solrQuery);
console.log('Solr response:', obj);

// Delete all documents
await this.solrService.deleteAll();
```

## API Spec

The `SolrService` wraps the Solr client from the [lbdremy/solr-node-client](https://github.com/lbdremy/solr-node-client) library. The `SolrModule.register()` takes options object as an argument to create the client, read more [here](https://lbdremy.github.io/solr-node-client/code/solr.js.html).

Solr Homepage: [https://solr.apache.org/](https://solr.apache.org/)