import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'demo',
    description: 'The name of user',
  })
  @Column({
    length: 10,
  })
  username: string;

  @ApiProperty({
    example: 'demo@example.com',
    description: 'The email of user',
  })
  @Column({
    unique: true,
    length: 40,
  })
  email: string;

  @ApiProperty({
    example: '0123456789',
    description: 'The phone of user',
  })
  @Column({
    nullable: true,
    length: 10,
  })
  phone: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
