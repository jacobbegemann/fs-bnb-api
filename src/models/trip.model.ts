import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Trip extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  rentalID: number;

  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  dates: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Trip>) {
    super(data);
  }
}
