import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entites/user.entity';
import { Repository } from '../../node_modules/typeorm';
import { getRepositoryToken } from '../../node_modules/@nestjs/typeorm';
import { JwtService } from '../jwt/jwt.service';
import { async } from '../../node_modules/rxjs';
import { EditProfileInput } from './dtos/edit-profile.dto';

type MockRepository<T=any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository<User>;
  let jwtService: JwtService;

  const MockRepository = () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  });

  const mockJwtRepository = {
    sign: jest.fn(() => 'sign-token-baby'),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: MockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtRepository
        }
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    const createAccountArgs = {
      email: '1',
      name: '1',
      password: '1',
      passwordConfirm: '1',
      role: 0,
    }
    it('should fail if user exists', async () => {
      usersRepository.findOne.mockResolvedValue({
        id:'1',
        email: '1',
      });
      const result = await service.createAccount(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is user with that email already',
      });
    });

    it('should create a new User', async () => {
      usersRepository.findOne.mockResolvedValue(undefined);
      usersRepository.create.mockReturnValue(createAccountArgs);
      usersRepository.save.mockResolvedValue(createAccountArgs);
      
      const result = await service.createAccount(createAccountArgs);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledWith(createAccountArgs);

      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(createAccountArgs);

      expect(result).toEqual({ok: true});
    });

    it('should fail on exception', async() => {
      usersRepository.findOne.mockRejectedValue(new Error());
      const result = await service.createAccount(createAccountArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Could`t create account'
      });
    });
  });

  describe('login', () => {
    const logInArgs = {
      email: '123@daum.com',
      password: '',
    };
    it('should fail if user does not exist', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      const result = await service.login(logInArgs);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object)
      )

      expect(result).toEqual({
        ok: false,
        error: 'User not Found',
      });
  });
  it('should fail if the password is wrong', async() => {
    const mockedUser = {
      checkPassword: jest.fn(() => Promise.resolve(false))
    };
    usersRepository.findOne.mockResolvedValue(mockedUser);
    const result = await service.login(logInArgs);
    expect(result).toEqual({
      ok: false,
      error: 'Wrong password',
    });
  });
  it('should fail on exception', async () => {
    usersRepository.findOne.mockResolvedValue(new Error());
    const result = await service.login(logInArgs);
    expect(result).toEqual({
      ok: false,
      error: "User not found",
    });
  });
  it('should return token if password correct', async () => {
    const mockedUser = {
      id: 1,
      checkPassword: jest.fn(() => Promise.resolve(true))
    }  
    usersRepository.findOne.mockResolvedValue(mockedUser)
    const result = await service.login(logInArgs);
    expect(jwtService.sign).toHaveBeenCalledTimes(1);
    expect(jwtService.sign).toHaveBeenCalledWith(
      expect.any(Number)
    );
    expect(result).toEqual({
      ok: true,
      token: 'sign-token-baby',
    });
    // it('should fail on exception', async () => {
    //   usersRepository.findOne.mockRejectedValue(new Error());
    //   const result = await service.login(logInArgs);
    //   expect(result).toEqual({
    //     ok: false,
    //     error: "Can`t log user in.",
    //   });
    // })
  });
})
describe('seeProfile', () => {
  const seeProfileArgs = {
    id: 1,
  };
  it('should find an exsting user', async () => {
    usersRepository.findOne.mockResolvedValue(seeProfileArgs);
    const result = await service.seeProfile(1);
    expect(result).toEqual({
      ok: true,
      user: seeProfileArgs,
    });   
  });
      it('should fail if no user is found', async () => {
        usersRepository.findOneOrFail.mockRejectedValue(new Error());
        const result = await service.seeProfile(1);
        expect(result).toEqual({
          ok: false,
          errror: 'User Not Found',
      });
    });
  });
  describe('editProfile', () => {
    it('should change email', async () => {
      const oldUser = {
        email: '123@old.com',
        name: 'googoo',
      };
      const editProfileArgs = {
        userId: 1,
        input: { 
          email: '12345@new.com',
          name: 'hoohoo',
        },
      };
      const newUser = {
        email: editProfileArgs.input.email,
        name: editProfileArgs.input.name,
      };

      usersRepository.findOne.mockResolvedValue(oldUser);

      await service.editProfile(editProfileArgs.userId, editProfileArgs.input);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(editProfileArgs.userId);
    });
    it('should change password', async () => {
      const editProfileArgs = {
        userId: 1,
        input: {password: 'new.password'},
      };
      usersRepository.findOne.mockResolvedValue({password: 'old'});
      const result = await service.editProfile(
        editProfileArgs.userId,
        editProfileArgs.input,
      )
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(editProfileArgs.input);
      expect(result).toEqual({ok: true});
    });
    it('should fail on excetion', async () => {
      usersRepository.findOne.mockRejectedValue(new Error());
      const result = await service.editProfile(1, {email: '1@naver.com'});
      expect(result).toEqual({
        ok: false,
        error: 'Could not update profile',
      });
    })
  })
})