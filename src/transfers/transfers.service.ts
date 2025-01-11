import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationalUnit } from '../organizational_units/entities/organizational_unit.entity';
import { ArrayContains, In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Transfer } from './entities/transfer.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(OrganizationalUnit)
    private readonly OURepository: Repository<OrganizationalUnit>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    private readonly usersService: UsersService,
  ) {}
  async create(userId: number, createTransferDto: CreateTransferDto) {
    try {
      return await this._validateTransferData(userId, createTransferDto);
    } catch (error) {
      return error;
    }
  }

  async findAll(userId: number) {
    const user = await this.usersService.findOne(userId);

    const transfers = await this.transferRepository.find({
      relations: {
        project: true,
        organizational_unit: true,
      },
      where: {
        project: {
          id: In(user.projects.map(({ id }) => id)),
        },
        organizational_unit: {
          id: In(user.organizational_units.map(({ id }) => id)),
        },
      },
    });
    return { transfers: transfers };
  }

  findOne(userId: number, id: number) {
    return `This action returns a #${id} transfer`;
  }

  async update(
    userId: number,
    id: number,
    updateTransferDto: UpdateTransferDto,
  ) {
    const { type, vehicle, client, transmitter, project, organizational_unit } =
      updateTransferDto;

    const transfer = await this.transferRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!transfer)
      throw new BadRequestException('There is no transfer for that id');

    const clientExists = await this.usersService.findOne(client);
    if (!clientExists)
      throw new BadRequestException(
        'Client must be a registered user of the platform',
      );

    const transmitterExists = await this.usersService.findOne(transmitter);
    if (!transmitterExists)
      throw new BadRequestException(
        'Transmitter must be a registered user of the platform',
      );

    const OUExists = await this.OURepository.findOne({
      relations: {
        users: true,
      },
      where: {
        id: organizational_unit,
      },
    });
    if (!OUExists)
      throw new BadRequestException(
        'The specified organizational unit does not exist',
      );

    const vehicleExists = await this.vehicleRepository.findOne({
      where: {
        id: vehicle,
      },
    });
    if (!vehicleExists)
      throw new BadRequestException(
        'Vehicle must be a registered user of the platform',
      );

    const projectExists = await this.projectRepository.findOne({
      relations: {
        users: true,
        organizational_units: true,
      },
      where: {
        id: project,
      },
    });
    if (!projectExists)
      throw new BadRequestException(
        'Project must be a registered user of the platform',
      );

    const userBelongsToProject = projectExists.users.find(
      (u) => u.id === userId,
    );

    if (!userBelongsToProject) {
      throw new UnauthorizedException(
        'The specified user does not have access to the specified project',
      );
    }

    const OUbelongsToProject = projectExists.organizational_units.find(
      (o) => o.id === organizational_unit,
    );
    if (!OUbelongsToProject) {
      throw new BadRequestException(
        'The requested project does not belong to the requested organizational unit',
      );
    }

    const userbelongsToOU = OUExists.users.find((u) => u.id === userId);
    if (!userbelongsToOU) {
      throw new BadRequestException(
        'The specified user does not have access to the specified organizational unit',
      );
    }

    transfer.client = clientExists;
    transfer.type = type;
    transfer.transmitter = transmitterExists;
    transfer.vehicle = vehicleExists;
    transfer.organizational_unit = OUExists;
    transfer.project = projectExists;

    const EditedTransfer = await this.transferRepository.save(transfer);
    return EditedTransfer;
  }

  async remove(userId: number, transferId: number) {
    const user = await this.usersService.findOne(userId);

    const transfer = await this.transferRepository.find({
      relations: {
        project: true,
        organizational_unit: true,
      },
      where: {
        id: transferId,
        organizational_unit: {
          id: In(user.organizational_units.map(({ id }) => id)),
        },
      },
    });

    if (!transfer) throw new NotFoundException('Transfer not found');
    return await this.transferRepository.remove(transfer);
  }

  async _validateTransferData(
    userId: number,
    createTransferDto: CreateTransferDto,
  ) {
    const { type, vehicle, client, transmitter, project, organizational_unit } =
      createTransferDto;

    const clientExists = await this.userRepository.findOne({
      where: {
        id: client,
      },
    });
    if (!clientExists)
      throw new BadRequestException(
        'Client must be a registered user of the platform',
      );

    const transmitterExists = await this.userRepository.findOne({
      where: {
        id: transmitter,
      },
    });
    if (!transmitterExists)
      throw new BadRequestException(
        'Transmitter must be a registered user of the platform',
      );

    const OUExists = await this.OURepository.findOne({
      relations: {
        users: true,
      },
      where: {
        id: organizational_unit,
      },
    });
    if (!OUExists)
      throw new BadRequestException(
        'The specified organizational unit does not exist',
      );

    const vehicleExists = await this.vehicleRepository.findOne({
      where: {
        id: vehicle,
      },
    });
    if (!vehicleExists)
      throw new BadRequestException(
        'Vehicle must be a registered user of the platform',
      );

    const projectExists = await this.projectRepository.findOne({
      relations: {
        users: true,
        organizational_units: true,
      },
      where: {
        id: project,
      },
    });
    if (!projectExists)
      throw new BadRequestException(
        'Project must be a registered user of the platform',
      );

    const userBelongsToProject = projectExists.users.find(
      (u) => u.id === userId,
    );

    if (!userBelongsToProject) {
      throw new UnauthorizedException(
        'The specified user does not have access to the specified project',
      );
    }

    const OUbelongsToProject = projectExists.organizational_units.find(
      (o) => o.id === organizational_unit,
    );
    if (!OUbelongsToProject) {
      throw new BadRequestException(
        'The requested project does not belong to the requested organizational unit',
      );
    }

    const userbelongsToOU = OUExists.users.find((u) => u.id === userId);
    if (!userbelongsToOU) {
      throw new BadRequestException(
        'The specified user does not have access to the specified organizational unit',
      );
    }

    const transfer = new Transfer();
    transfer.client = clientExists;
    transfer.type = type;
    transfer.transmitter = transmitterExists;
    transfer.vehicle = vehicleExists;
    transfer.organizational_unit = OUExists;
    transfer.project = projectExists;

    const newTransfer = await this.transferRepository.save(transfer);
    return newTransfer;
  }
}
