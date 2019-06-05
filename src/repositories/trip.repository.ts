import { DefaultCrudRepository } from '@loopback/repository';
import { Trip } from '../models';
import { MysqldbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TripRepository extends DefaultCrudRepository<
  Trip,
  typeof Trip.prototype.id
  > {
  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource,
  ) {
    super(Trip, dataSource);
  }
}
