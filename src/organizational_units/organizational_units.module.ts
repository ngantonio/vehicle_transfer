import { Module } from '@nestjs/common';
import { OrganizationalUnitsService } from './organizational_units.service';
import { OrganizationalUnitsController } from './organizational_units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationalUnit } from './entities/organizational_unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationalUnit])],
  controllers: [OrganizationalUnitsController],
  providers: [OrganizationalUnitsService],
})
export class OrganizationalUnitsModule {}
