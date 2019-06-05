import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    mysql: {
      columnName: "first_name"
    }
  })
  firstName?: string;

  @property({
    type: 'string',
    mysql: {
      columnName: "last_name"
    }
  })
  lastName?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  location?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}
