import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { name, description, permissions } = createRoleDto;

    try {
      const roleExists = await this.roleRepository.findOne({
        where: { name: name },
      });

      if (roleExists) {
        throw new BadRequestException('Role already registered.');
      }

      const permissionIds = [];
      for (let i = 0; i < permissions.length; i++) {
        const newPermission = this.permissionRepository.create(permissions[i]);
        const perm = await this.permissionRepository.save(newPermission);
        permissionIds.push(perm.id);
      }

      const role = new Role();
      role.name = name;
      role.description = description;
      role.permissions = await this.permissionRepository.find({
        where: { id: In(permissionIds) },
      });

      const newRole = await this.roleRepository.save(role);

      return { message: 'Role created', newRole };
    } catch (error) {
      console.log(error);
      return new HttpException(error, 500);
    }
  }

  async findAll() {
    return await this.roleRepository.find({
      relations: ['permissions'],
    });
  }

  async findOne(id: number) {
    return await this.roleRepository.find({
      relations: ['permissions'],
      where: { id: id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    const updatedRole = Object.assign(role, updateRoleDto);
    return await this.roleRepository.save(updatedRole);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    return await this.roleRepository.remove(role);
  }
}
