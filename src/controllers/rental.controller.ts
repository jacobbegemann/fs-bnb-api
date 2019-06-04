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
import { Rental } from '../models';
import { RentalRepository } from '../repositories';

export class RentalController {
  constructor(
    @repository(RentalRepository)
    public rentalRepository: RentalRepository,
  ) { }

  @post('/rentals', {
    responses: {
      '200': {
        description: 'Rental model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Rental } } },
      },
    },
  })
  async create(@requestBody() rental: Rental): Promise<Rental> {
    return await this.rentalRepository.create(rental);
  }

  @get('/rentals/count', {
    responses: {
      '200': {
        description: 'Rental model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Rental)) where?: Where,
  ): Promise<Count> {
    return await this.rentalRepository.count(where);
  }

  @get('/rentals', {
    responses: {
      '200': {
        description: 'Array of Rental model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Rental } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Rental)) filter?: Filter<Rental>,
  ): Promise<Rental[]> {
    return await this.rentalRepository.find(filter);
  }

  @patch('/rentals', {
    responses: {
      '200': {
        description: 'Rental PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() rental: Rental,
    @param.query.object('where', getWhereSchemaFor(Rental)) where?: Where,
  ): Promise<Count> {
    return await this.rentalRepository.updateAll(rental, where);
  }

  @get('/rentals/{id}', {
    responses: {
      '200': {
        description: 'Rental model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Rental } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Rental> {
    return await this.rentalRepository.findById(id);
  }

  @patch('/rentals/{id}', {
    responses: {
      '204': {
        description: 'Rental PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() rental: Rental,
  ): Promise<void> {
    await this.rentalRepository.updateById(id, rental);
  }

  @put('/rentals/{id}', {
    responses: {
      '204': {
        description: 'Rental PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rental: Rental,
  ): Promise<void> {
    await this.rentalRepository.replaceById(id, rental);
  }

  @del('/rentals/{id}', {
    responses: {
      '204': {
        description: 'Rental DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rentalRepository.deleteById(id);
  }
}
