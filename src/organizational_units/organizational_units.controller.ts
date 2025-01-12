import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationalUnitsService } from './organizational_units.service';
import { CreateOrganizationalUnitDto } from './dto/create-organizational_unit.dto';
import { UpdateOrganizationalUnitDto } from './dto/update-organizational_unit.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../utils/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Organizational-Units')
@Auth(Role.ADMIN)
@Controller('organizational-units')
export class OrganizationalUnitsController {
  constructor(
    private readonly organizationalUnitsService: OrganizationalUnitsService,
  ) {}

  @Post()
  create(@Body() createOrganizationalUnitDto: CreateOrganizationalUnitDto) {
    return this.organizationalUnitsService.create(createOrganizationalUnitDto);
  }

  @Get()
  findAll() {
    return this.organizationalUnitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationalUnitsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationalUnitDto: UpdateOrganizationalUnitDto,
  ) {
    return this.organizationalUnitsService.update(
      +id,
      updateOrganizationalUnitDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationalUnitsService.remove(+id);
  }
}
