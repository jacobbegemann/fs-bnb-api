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
  ): Promise<string> {
    return await this.userRepository.find(
      (new FilterBuilder<User>())
        .where((new WhereBuilder())
          .eq("email", user.email)
          .eq("password", user.password)
          .build())
        .build()
    ).then((value) => {
      if (value.length) {
        const obj = {
          token: this.generateJWT(value[0].getId()),
          id: value[0].getId()
        };
        return JSON.stringify(obj);
      } else {
        throw new HttpErrors.NotFound;
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
  ): Promise<string> {
    const emailWhere: Where = (new WhereBuilder<User>()).eq("email", user.email).build();
    const filter: Filter<User> = (new FilterBuilder<User>())
      .where(emailWhere)
      .build();
    return await this.userRepository.find(filter).then((value: User[]) => {
      if (value.length) {
        throw new HttpErrors.Conflict;
      } else {
        user.yearJoined = (new Date()).getFullYear();
        return this.userRepository.create(user).then((newUser: User) => this.login(newUser));
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
        content: { 'application/json': { schema: { 'x-ts-type': User } } }
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.header.string('Authorization') token: string
  ): Promise<User> {
    const jwt = require('jsonwebtoken');
    return await jwt.verify(token, "9zAjr6A7rC", (err: any, decoded: any) => {
      if (err) {
        throw new HttpErrors.Forbidden;
      } else {
        return this.userRepository.findById(id);
      }
    });
  }

  @get('/users/unprotected/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } }
      },
    },
  })
  async findByIdUnprotected(
    @param.path.number('id') id: number,
  ): Promise<User> {
    const complete: User = await this.userRepository.findById(id);
    complete.messages = '';
    complete.password = '';
    complete.saved = '';
    complete.birthday = '';
    complete.bookings = '';
    return complete;
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

  generateJWT(userID: number): string {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ "userID": userID }, "9zAjr6A7rC");
  }

}
