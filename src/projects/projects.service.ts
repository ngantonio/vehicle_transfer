import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationalUnit } from '../organizational_units/entities/organizational_unit.entity';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(OrganizationalUnit)
    private readonly OURepository: Repository<OrganizationalUnit>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    const { name, description, users, organizational_units } = createProjectDto;

    const project = new Project();
    project.name = name;
    project.description = description;

    if (users) {
      const verified_users = [];
      for (let i = 0; i < users.length; i++) {
        const userExists = await this.userRepository.findOne({
          where: {
            id: users[i],
          },
        });
        if (userExists) verified_users.push(userExists);
      }
      project.users = verified_users;
    }

    if (organizational_units) {
      const verified_ou = [];
      for (let i = 0; i < verified_ou.length; i++) {
        const OU = await this.OURepository.findOne({
          where: {
            id: organizational_units[i],
          },
        });
        if (OU) verified_ou.push(OU);
      }
      project.organizational_units = verified_ou;
    }

    return await this.projectRepository.save(project);
  }

  async findAll() {
    return await this.projectRepository.find({
      relations: {
        users: true,
        organizational_units: true,
      },
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      relations: {
        users: true,
        organizational_units: true,
      },
      where: {
        id: id,
      },
    });

    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { name, description, users, organizational_units } = updateProjectDto;

    const project = await this.findOne(id);

    if (!project) throw new NotFoundException('Project not found');

    project.name = name;
    project.description = description;

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
      project.users = verified_users;
    }

    if (organizational_units) {
      const verified_ou = [];
      for (let i = 0; i < verified_ou.length; i++) {
        const OU = await this.OURepository.findOne({
          where: {
            id: organizational_units[i],
          },
        });
        if (OU) verified_ou.push(OU);
      }
      project.organizational_units = verified_ou;
    }

    return await this.projectRepository.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    return await this.projectRepository.remove(project);
  }
}
