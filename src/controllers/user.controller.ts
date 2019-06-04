import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  FilterBuilder,
  WhereBuilder,
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
  HttpErrors,
} from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';
import bodyParser = require('body-parser');

export class UserController {

  private max: number = 1000000;

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

  @post('/users/authentication', {
    responses: {
      '200': {
        description: 'a session id',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async login(
    @requestBody() user: User,
  ): Promise<number> {
    return await this.userRepository.find(
      (new FilterBuilder<User>())
        .where((new WhereBuilder())
          .eq("email", user.email)
          .eq("password", user.password)
          .build())
        .build()
    ).then((value) => {
      if (value.length) {
        return this.getRandomInt(this.max) * value[0].getId();
      } else {
        return 0;
      }
    });
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async register(
    @requestBody() user: User,
  ): Promise<User> {
    const emailWhere: Where = (new WhereBuilder<User>()).eq("email", user.email).build();
    const usernameWhere: Where = (new WhereBuilder<User>()).eq("username", user.username).build();
    return await this.userRepository.find(
      (new FilterBuilder<User>())
        .where((new WhereBuilder<User>())
          .or(emailWhere, usernameWhere)
          .build())
        .build())
      .then((value) => {
        if (value.length) {
          throw new HttpErrors.Conflict;
        } else {
          return this.userRepository.create(user);
        }
      });
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': User } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter<User>,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
