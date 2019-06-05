import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Trip extends Entity {
  @property({
    type: 'number',
    mysql: {
      columnName: 'rental_id'
    }
  })
  rentalID: number;

  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'user_id'
    }
  })
  userID: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'date_from'
    }
  })
  dateFrom: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'date_to'
    }
  })
  dateTo: string;

  @property({
    type: 'string',
  })
  status: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Trip>) {
    super(data);
  }
}
