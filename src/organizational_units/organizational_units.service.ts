import { Injectable } from '@nestjs/common';
import { CreateOrganizationalUnitDto } from './dto/create-organizational_unit.dto';
import { UpdateOrganizationalUnitDto } from './dto/update-organizational_unit.dto';

@Injectable()
export class OrganizationalUnitsService {
  create(createOrganizationalUnitDto: CreateOrganizationalUnitDto) {
    return 'This action adds a new organizationalUnit';
  }

  findAll() {
    return `This action returns all organizationalUnits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationalUnit`;
  }

  update(id: number, updateOrganizationalUnitDto: UpdateOrganizationalUnitDto) {
    return `This action updates a #${id} organizationalUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationalUnit`;
  }
}
