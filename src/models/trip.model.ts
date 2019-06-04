import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Trip extends Entity {
  @property({
    type: 'number',
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
  })
  userID: number;

  @property({
    type: 'string',
    required: true,
  })
  dateFrom: string;

  @property({
    type: 'string',
    required: true,
  })
  dateTo: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Trip>) {
    super(data);
  }
}
