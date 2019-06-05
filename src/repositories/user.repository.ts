import { DefaultCrudRepository } from '@loopback/repository';
import { User } from '../models';
import { MysqldbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource,
  ) {
    super(User, dataSource);
  }
}
