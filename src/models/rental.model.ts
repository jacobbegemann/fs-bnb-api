import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Rental extends Entity {
  @property({
    type: 'number',
    id: true
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
    type: 'string',
    required: true,
    mysql: {
      columnName: "picture_sources"
    }
  })
  pictureSources: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: "host_id"
    }
  })
  hostID: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Rental>) {
    super(data);
  }
}
