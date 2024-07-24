import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  const users = [
    {
      id: 1,
      username: 'user',
      email: 'user@example.com',
      phone: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: {
            find: jest.fn().mockResolvedValue(users),
            findOneBy: jest.fn().mockResolvedValue(users[0]),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<typeof userRepository>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      (userRepository as any).save.mockResolvedValue(users[0]);

      const result = await service.create({
        username: users[0].username,
        email: users[0].email,
      });

      expect(result).toEqual(users[0]);
      expect(userRepository.save).toHaveBeenCalledWith({
        username: users[0].username,
        email: users[0].email,
      });
    });

    it.todo('should throw an error when user already exists');
  });

  describe('findAll', () => {
    it('should get entities', async () => {
      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get a entity', async () => {
      const result = await service.findOne(users[0].id);

      expect(result).toEqual(users[0]);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        id: users[0].id,
      });
    });

    it.todo('should throw an error when entity not found');
  });

  describe('findByEmail', () => {
    it('should get a entity', async () => {
      const result = await service.findByEmail(users[0].email);

      expect(result).toEqual(users[0]);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: users[0].email,
      });
    });
  });

  describe('update', () => {
    it('should get a entity', async () => {
      const entity = new User();
      entity.save = jest.fn().mockResolvedValue({
        ...users[0],
        phone: '0987654321',
      });
      (userRepository.findOneBy as jest.Mock).mockResolvedValue(entity);

      const result = await service.update(users[0].id, {
        phone: '0987654321',
      });

      expect(result).toEqual({
        ...users[0],
        phone: '0987654321',
      });
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        id: users[0].id,
      });
      expect(entity.save).toHaveBeenCalled();
    });

    it.todo('should throw an error when entity not found');
  });

  describe('remove', () => {
    it('should remove a entity', async () => {
      const entity = new User();
      entity.remove = jest.fn().mockResolvedValue(undefined);
      (userRepository.findOneBy as jest.Mock).mockResolvedValue(entity);

      const result = await service.remove(users[0].id);

      expect(result).toBeUndefined();
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        id: users[0].id,
      });
      expect(entity.remove).toHaveBeenCalled();
    });

    it.todo('should throw an error when entity not found');
  });
});
