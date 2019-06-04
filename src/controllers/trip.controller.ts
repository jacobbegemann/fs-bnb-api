import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Trip } from '../models';
import { TripRepository } from '../repositories';

export class TripController {
  constructor(
    @repository(TripRepository)
    public tripRepository: TripRepository,
  ) { }

  @post('/trips', {
    responses: {
      '200': {
        description: 'Trip model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Trip } } },
      },
    },
  })
  async create(@requestBody() trip: Trip): Promise<Trip> {
    return await this.tripRepository.create(trip);
  }

  @get('/trips/count', {
    responses: {
      '200': {
        description: 'Trip model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Trip)) where?: Where,
  ): Promise<Count> {
    return await this.tripRepository.count(where);
  }

  @get('/trips', {
    responses: {
      '200': {
        description: 'Array of Trip model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Trip } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Trip)) filter?: Filter<Trip>,
  ): Promise<Trip[]> {
    return await this.tripRepository.find(filter);
  }

  @patch('/trips', {
    responses: {
      '200': {
        description: 'Trip PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() trip: Trip,
    @param.query.object('where', getWhereSchemaFor(Trip)) where?: Where,
  ): Promise<Count> {
    return await this.tripRepository.updateAll(trip, where);
  }

  @get('/trips/{id}', {
    responses: {
      '200': {
        description: 'Trip model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Trip } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Trip> {
    return await this.tripRepository.findById(id);
  }

  @patch('/trips/{id}', {
    responses: {
      '204': {
        description: 'Trip PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() trip: Trip,
  ): Promise<void> {
    await this.tripRepository.updateById(id, trip);
  }

  @put('/trips/{id}', {
    responses: {
      '204': {
        description: 'Trip PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() trip: Trip,
  ): Promise<void> {
    await this.tripRepository.replaceById(id, trip);
  }

  @del('/trips/{id}', {
    responses: {
      '204': {
        description: 'Trip DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tripRepository.deleteById(id);
  }
}
