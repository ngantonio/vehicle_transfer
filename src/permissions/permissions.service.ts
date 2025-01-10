import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const newPermission = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(newPermission);
  }

  async findAll() {
    return await this.permissionRepository.find();
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id: id },
    });

    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOne(id);
    const updatedPermission = Object.assign(permission, updatePermissionDto);
    return await this.permissionRepository.save(updatedPermission);
  }

  async remove(id: number) {
    const permission = await this.findOne(id);
    return await this.permissionRepository.remove(permission);
  }
}
