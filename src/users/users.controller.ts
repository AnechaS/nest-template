import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public create(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.create(data);
  }

  @ApiOperation({
    summary: 'Get users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: User,
  })
  @Get()
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: User,
  })
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: User,
  })
  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, data);
  }

  @ApiOperation({
    summary: 'Delete a user',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Success',
    example: {},
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<object> {
    await this.usersService.remove(id);
    return {};
  }
}
