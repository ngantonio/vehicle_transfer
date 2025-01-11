import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { Transfer } from './entities/transfer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { Project } from '../projects/entities/project.entity';
import { OrganizationalUnit } from '../organizational_units/entities/organizational_unit.entity';
import { User } from '../users/entities/user.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    TypeOrmModule.forFeature([Transfer]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([OrganizationalUnit]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Vehicle]),
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule {}
