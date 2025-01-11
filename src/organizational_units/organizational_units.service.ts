import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationalUnitDto } from './dto/create-organizational_unit.dto';
import { UpdateOrganizationalUnitDto } from './dto/update-organizational_unit.dto';
import { OrganizationalUnit } from './entities/organizational_unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrganizationalUnitsService {
  constructor(
    @InjectRepository(OrganizationalUnit)
    private readonly OURepository: Repository<OrganizationalUnit>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createOrganizationalUnitDto: CreateOrganizationalUnitDto) {
    const { name, users, project_id } = createOrganizationalUnitDto;

    const projectExists = await this.projectRepository.findOne({
      where: {
        id: project_id,
      },
    });

    if (!projectExists) {
      throw new BadRequestException(
        'There is no project registered with that id',
      );
    }

    const org_unit = new OrganizationalUnit();
    if (users) {
      const verified_users = [];
      for (let i = 0; i < users.length; i++) {
        const user = await this.userRepository.findOne({
          where: {
            id: users[i],
          },
        });
        if (user) verified_users.push(user);
      }
      org_unit.users = verified_users;
    }

    org_unit.name = name;
    org_unit.project = projectExists;

    return await this.OURepository.save(org_unit);
  }

  async findAll() {
    return await this.OURepository.find({
      relations: {
        users: true,
        project: true,
      },
    });
  }

  async findOne(id: number) {
    const ou = await this.OURepository.findOne({
      where: { id: id },
    });

    if (!ou) throw new NotFoundException('Organizational Unit not found');
    return ou;
  }

  async update(
    id: number,
    updateOrganizationalUnitDto: UpdateOrganizationalUnitDto,
  ) {
    const ou = await this.findOne(id);

    const { name, users, project_id } = updateOrganizationalUnitDto;

    const projectExists = await this.projectRepository.findOne({
      where: {
        id: project_id,
      },
    });

    if (!projectExists) {
      throw new BadRequestException(
        'There is no project registered with that id',
      );
    }

    if (users) {
      const verified_users = [];
      for (let i = 0; i < users.length; i++) {
        const user = await this.userRepository.findOne({
          where: {
            id: users[i],
          },
        });
        if (user) verified_users.push(user);
      }
      ou.users = verified_users;
    }

    ou.name = name;
    ou.project = projectExists;
    return await this.OURepository.save(ou);
  }

  async remove(id: number) {
    const ou = await this.findOne(id);
    return await this.OURepository.remove(ou);
  }
}
