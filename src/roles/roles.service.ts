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
    const { name, description, permissions, permission_ids } = createRoleDto;

    try {
      const roleExists = await this.roleRepository.findOne({
        where: { name: name },
      });

      if (roleExists) {
        throw new BadRequestException('Role already registered.');
      }

      if (permissions && permission_ids) {
        throw new BadRequestException('Bad request.');
      }

      const role = new Role();
      role.name = name;
      role.description = description;

      if (permissions) {
        const permissionIds = [];
        for (let i = 0; i < permissions.length; i++) {
          const newPermission = this.permissionRepository.create(
            permissions[i],
          );
          const perm = await this.permissionRepository.save(newPermission);
          permissionIds.push(perm.id);
        }

        role.permissions = await this.permissionRepository.find({
          where: { id: In(permissionIds) },
        });
      }

      if (permission_ids) {
        role.permissions = await this.permissionRepository.find({
          where: { id: In(permission_ids) },
        });
      }

      const newRole = await this.roleRepository.save(role);

      return { message: 'Role created', newRole };
    } catch (error) {
      return error;
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

  async findOneByName(name: string) {
    return await this.roleRepository.find({
      relations: ['permissions'],
      where: { name: name },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    console.log('entra');
    const { name, description, permissions, permission_ids } = updateRoleDto;

    try {
      const roleExists = await this.roleRepository.findOne({
        where: { id: id },
      });

      if (!roleExists) {
        throw new BadRequestException('Role not found.');
      }

      if (permissions && permission_ids) {
        throw new BadRequestException('Bad request.');
      }

      roleExists.name = name;
      roleExists.description = description;

      if (permissions) {
        const permissionIds = [];
        for (let i = 0; i < permissions.length; i++) {
          const newPermission = this.permissionRepository.create(
            permissions[i],
          );
          const perm = await this.permissionRepository.save(newPermission);
          permissionIds.push(perm.id);
        }

        roleExists.permissions = await this.permissionRepository.find({
          where: { id: In(permissionIds) },
        });
      }

      if (permission_ids) {
        roleExists.permissions = await this.permissionRepository.find({
          where: { id: In(permission_ids) },
        });
      }

      console.log('sdsds', roleExists);
      const newRole = await this.roleRepository.save(roleExists);

      return { message: 'Role updated', newRole };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    return await this.roleRepository.remove(role);
  }
}
