import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Rental extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  pictureSources: string[];

  @property({
    type: 'number',
    required: true,
  })
  hostID: number;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Rental>) {
    super(data);
  }
}
