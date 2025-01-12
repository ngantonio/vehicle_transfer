import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { OrganizationalUnit } from '../organizational_units/entities/organizational_unit.entity';
import { User } from '../users/entities/user.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    RolesModule,
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([OrganizationalUnit]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
