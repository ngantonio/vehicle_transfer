import { Module } from '@nestjs/common';
import { OrganizationalUnitsService } from './organizational_units.service';
import { OrganizationalUnitsController } from './organizational_units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationalUnit } from './entities/organizational_unit.entity';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    RolesModule,
    TypeOrmModule.forFeature([OrganizationalUnit]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [OrganizationalUnitsController],
  providers: [OrganizationalUnitsService],
  exports: [OrganizationalUnitsService],
})
export class OrganizationalUnitsModule {}
