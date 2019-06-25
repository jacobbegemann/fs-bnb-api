import { DefaultCrudRepository } from '@loopback/repository';
import { Trip } from '../models';
import { MysqldbDataSource, DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TripRepository extends DefaultCrudRepository<
  Trip,
  typeof Trip.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Trip, dataSource);
  }
}
