import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mysqldb.datasource.json';

export class MysqldbDataSource extends juggler.DataSource {
  static dataSourceName = 'mysqldb';

  constructor(
    @inject('datasources.config.mysqldb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
