import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  FilterBuilder,
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
import { Trip, Rental } from '../models';
import { TripRepository, RentalRepository } from '../repositories';

export class TripController {
  constructor(
    @repository(TripRepository)
    public tripRepository: TripRepository,
    @repository(RentalRepository)
    public rentalRepository: RentalRepository
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

  @get('/trips/byHost/{id}', {
    responses: {
      '200': {
        description: 'Trip model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Trip } } },
      },
    },
  })
  async findByHostId(@param.path.number('id') id: number): Promise<Trip[]> {
    const filter: Filter<Rental> = new FilterBuilder<Rental>().build();
    filter.where = { hostID: id };
    const foundRental: Rental[] = await this.rentalRepository.find(filter);
    const trips: Trip[] = [];
    for (let i = 0; i < foundRental.length; i++) {
      const rental = foundRental[i];
      const tripFilter: Filter<Trip> = new FilterBuilder<Trip>().build();
      filter.where = { rentalID: rental.getId() };
      const foundTrips: Trip[] = await this.tripRepository.find(tripFilter);
      for (let j = 0; j < foundTrips.length; j++) {
        if (foundTrips[j].rentalID == rental.getId()) trips.push(foundTrips[j]);
      }
    }
    return trips;
  }

  @get('/trips/byUser/{id}', {
    responses: {
      '200': {
        description: 'Trip model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Trip } } },
      },
    },
  })
  async findByUserId(@param.path.number('id') id: number): Promise<Trip[]> {
    const filter: Filter<Trip> = (new FilterBuilder<Trip>()).build();
    filter.where = { userID: id };
    return await this.tripRepository.find(filter);
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
