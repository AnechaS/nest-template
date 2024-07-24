import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue({
              id: 1,
              username: 'user',
              email: 'user@example.com',
              phone: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = await authService.login({ email: 'user@example.com' });

      expect(result).toEqual({ accessToken: expect.any(String) });
      expect(usersService.findByEmail).toHaveBeenCalledWith('user@example.com');
    });

    it('should throw an error when the email is not exist', async () => {
      usersService.findByEmail = jest.fn().mockResolvedValue(null);
      await expect(
        authService.login({ email: 'user@example.com' }),
      ).rejects.toThrow('The email is invalid.');
    });
  });
});
