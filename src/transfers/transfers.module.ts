import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { Transfer } from './entities/transfer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { OrganizationalUnitsModule } from '../organizational_units/organizational_units.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    UsersModule,
    OrganizationalUnitsModule,
    VehiclesModule,
    ProjectsModule,
    RolesModule,
    TypeOrmModule.forFeature([Transfer]),
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule {}
