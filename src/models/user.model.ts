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
  password?: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'string',
  })
  birthday?: string;

  @property({
    type: 'string',
    mysql: {
      columnName: 'num_bookings'
    }
  })
  numBookings?: string;

  @property({
    type: 'string',
  })
  reviews?: string;

  @property({
    type: 'string',
  })
  bookings?: string;

  @property({
    type: 'string',
  })
  saved?: string;

  @property({
    type: 'string',
  })
  messages?: string;

  @property({
    type: 'string',
    mysql: {
      columnName: 'photo_source'
    }
  })
  photoSource?: string;

  @property({
    type: 'string',
    mysql: {
      columnName: 'year_joined'
    }
  })
  yearJoined?: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
