import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationalUnitDto } from './create-organizational_unit.dto';

export class UpdateOrganizationalUnitDto extends PartialType(CreateOrganizationalUnitDto) {}
