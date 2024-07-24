import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public create(data: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = data.username;
    user.email = data.email;
    user.phone = data.phone;
    return this.usersRepository.save(user);
  }

  // TODO: filter records, pagination
  public async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  public findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  public async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return user.save();
  }

  public async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.remove();
  }
}
