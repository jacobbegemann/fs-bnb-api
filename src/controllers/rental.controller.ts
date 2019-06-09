import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  WhereBuilder,
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
import { Rental, Trip } from '../models';
import { RentalRepository, TripRepository } from '../repositories';

export class RentalController {

  private fileNo: number;

  constructor(
    @repository(RentalRepository)
    public rentalRepository: RentalRepository,
    @repository(TripRepository)
    public tripRepository: TripRepository
  ) { }

  @post('/properties', {
    responses: {
      '200': {
        description: 'Rental model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Rental } } },
      },
    },
  })
  async addProperty(
    @requestBody() rental: Rental
  ): Promise<Rental> {
    const arr = rental.pictureSources.split('@');
    let fileSources = '';
    const fs = require("fs");
    for (let i = 0; i < arr.length; i++) {
      let str = arr[i];
      await new Promise((resolve, reject) => {
        fs.readdir(`data/images`, (err: any, files: any) => {
          if (err) throw err;
          if (str) {
            fs.writeFile(`data/images/imageFile${files.length + 1}.txt`, str, (err: any) => {
              if (err) reject(err);
              fileSources += `imageFile${files.length + 1}.txt@`;
              resolve();
            });
          } else {
            resolve();
          }
        });
      });
    }
    rental.pictureSources = fileSources;
    return await this.rentalRepository.create(rental);
  }

  @get('/properties/{id}', {
    responses: {
      '200': {
        description: 'Rental model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Rental } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Rental> {
    const foundRental: Rental = await this.rentalRepository.findById(id);
    const fileArr = foundRental.pictureSources.split('@');
    const fs = require('fs');
    let imageData = '';
    for (let i = 0; i < fileArr.length; i++) {
      const path = fileArr[i];
      if (path.substr(0, 7) === 'http://' || path.substr(0, 8) === 'https://') {
        imageData += `${path}@`;
      } else if (path.substr(0, 9) === 'imageFile') {
        await new Promise((resolve, reject) => {
          fs.readFile(`data/images/${path}`, (err: any, data: any) => {
            if (err) reject(err);
            imageData += `${data.toString()}@`;
            resolve();
          });
        });
      }
    }
    foundRental.pictureSources = imageData;
    return foundRental;
  }

  @get('/properties/byHost/{hostID}', {
    responses: {
      '200': {
        description: 'Rental model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Rental } } },
      },
    },
  })
  async findByHostId(@param.path.number('hostID') hostID: number): Promise<Rental[]> {
    const filter: Filter<Rental> = new FilterBuilder<Rental>().build();
    filter.where = { hostID: hostID };
    const foundRental: Rental[] = await this.rentalRepository.find(filter);
    const fs = require("fs");
    for (let i = 0; i < foundRental.length; i++) {
      const value = foundRental[i];
      const fileArr = value.pictureSources.split('@');
      let imageData = '';
      for (let j = 0; j < fileArr.length; j++) {
        const path = fileArr[j];
        if (path.substr(0, 7) === 'http://' || path.substr(0, 8) === 'https://') {
          imageData += `${path}@`;
        } else if (path.substr(0, 9) === 'imageFile') {
          await new Promise((resolve, reject) => {
            fs.readFile(`data/images/${path}`, (err: any, data: any) => {
              if (err) reject(err);
              imageData += `${data.toString()}@`;
              resolve();
            });
          });
        }
      }
      value.pictureSources = imageData;
    }
    return foundRental;
  }

  @del('/properties/{id}', {
    responses: {
      '204': {
        description: 'Rental DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rentalRepository.deleteById(id);
  }

  @post('/properties/{id}/bookings', {
    responses: {
      '200': {
        description: 'Trip instance',
        content: { 'application/json': { schema: { 'x-ts-type': Trip } } },
      },
    },
  })
  async bookById(@requestBody() trip: Trip, @param.path.number('id') id: number): Promise<Trip> {
    trip.rentalID = id;
    trip.status = "NEW";
    return await this.tripRepository.create(trip);
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
    const foundRental: Rental[] = await this.rentalRepository.find(filter);
    const fs = require("fs");
    for (let i = 0; i < foundRental.length; i++) {
      const value = foundRental[i];
      const fileArr = value.pictureSources.split('@');
      let imageData = '';
      for (let j = 0; j < fileArr.length; j++) {
        const path = fileArr[j];
        if (path.substr(0, 7) === 'http://' || path.substr(0, 8) === 'https://') {
          imageData += `${path}@`;
        } else if (path.substr(0, 9) === 'imageFile') {
          await new Promise((resolve, reject) => {
            fs.readFile(`data/images/${path}`, (err: any, data: any) => {
              if (err) reject(err);
              imageData += `${data.toString()}@`;
              resolve();
            });
          });
        }
      }
      value.pictureSources = imageData;
    }
    return foundRental;
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

  @patch('/properties/{id}', {
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
    const arr = rental.pictureSources.split('@');
    let fileSources = '';
    const fs = require("fs");
    for (let i = 0; i < arr.length; i++) {
      let str = arr[i];
      await new Promise((resolve, reject) => {
        fs.readdir(`data/images`, (err: any, files: any) => {
          if (str) {
            fs.writeFile(`data/images/imageFile${files.length + 1}.txt`, str, (err: any) => {
              if (err) reject(err);
              fileSources += `imageFile${files.length + 1}.txt@`;
              resolve();
            });
          } else {
            resolve();
          }
        });
      });
    }
    rental.pictureSources = fileSources;
    return await this.rentalRepository.updateById(id, rental);
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

}
