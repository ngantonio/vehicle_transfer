import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (userExists) {
        throw new BadRequestException(
          'User already registered with this email',
        );
      }

      const roleExists = await this.roleRepository.find({
        relations: {
          permissions: true,
        },
        where: { id: createUserDto.role_id },
        select: {
          id: true,
          name: true,
          permissions: {
            name: true,
          },
        },
      });

      if (!roleExists) {
        throw new BadRequestException(
          'There is no role registered with that id',
        );
      }
      const newUser = this.userRepository.create(createUserDto);
      newUser.roles = roleExists;
      const usr = await this.userRepository.save(newUser);
      return {
        user: usr,
        role: roleExists,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      relations: {
        roles: {
          permissions: true,
        },
      },
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        roles: {
          name: true,
          permissions: true,
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
