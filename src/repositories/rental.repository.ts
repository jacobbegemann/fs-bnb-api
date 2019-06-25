import { DefaultCrudRepository } from '@loopback/repository';
import { Rental } from '../models';
import { DbDataSource, MysqldbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RentalRepository extends DefaultCrudRepository<
  Rental,
  typeof Rental.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Rental, dataSource);
  }
}
