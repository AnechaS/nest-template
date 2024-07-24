import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
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

  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(users),
            findOne: jest.fn().mockResolvedValue(users[0]),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a entity', async () => {
      const entity = {
        id: 2,
        username: 'user2',
        email: 'user2@email.com',
        phone: '0123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (service.create as jest.Mock).mockResolvedValue(entity as any);

      const result = await controller.create({
        username: entity.username,
        email: entity.email,
      });

      expect(result).toEqual(entity);
    });
  });

  describe('findAll', () => {
    it('should return entities', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a entity', async () => {
      const result = await controller.findOne(1);

      expect(result).toEqual(users[0]);
    });
  });

  describe('update', () => {
    it('should update a entity', async () => {
      const entity = {
        id: 2,
        username: 'user2',
        email: 'user2@email.com',
        phone: '0123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (service.update as jest.Mock).mockResolvedValue(entity as any);

      const result = await controller.update(2, {
        username: entity.username,
        email: entity.email,
      });

      expect(result).toEqual(entity);
    });
  });

  describe('remove', () => {
    it('should remove a entity', async () => {
      const result = await controller.remove(2);

      expect(result).toEqual({});
    });
  });
});
