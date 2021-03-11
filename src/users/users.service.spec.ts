import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { async } from '../../node_modules/rxjs';
import { User } from './entites/user.entity';
import { Repository } from '../../node_modules/typeorm';
import { getRepositoryToken } from '../../node_modules/@nestjs/typeorm';
import { JwtService } from '../jwt/jwt.service';

type MockRepository<T=any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UsersService;
  let usersRepository: MockRepository<User>;

  const MockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtRepository = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: MockRepository
        },
        {
          provide: JwtService,
          useValue: mockJwtRepository
        }
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

})