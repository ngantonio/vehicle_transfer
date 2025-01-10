import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { RequiresPermission } from '../auth/decorators/permissions.decorator';
import { Role, TransferModulePermissions } from '../utils/enums';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { Auth } from '../auth/decorators/auth.decorator';

@Auth(Role.ADMIN)
@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @RequiresPermission(TransferModulePermissions.edit_transfers)
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.transfersService.create(createTransferDto);
  }

  @RequiresPermission(TransferModulePermissions.view_transfers)
  @UseGuards(PermissionsGuard)
  @Get()
  findAll() {
    return this.transfersService.findAll();
  }

  @RequiresPermission(TransferModulePermissions.view_transfers)
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transfersService.findOne(+id);
  }

  @RequiresPermission(TransferModulePermissions.edit_transfers)
  @UseGuards(PermissionsGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransferDto: UpdateTransferDto,
  ) {
    return this.transfersService.update(+id, updateTransferDto);
  }

  @RequiresPermission(TransferModulePermissions.delete_transfer)
  @UseGuards(PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transfersService.remove(+id);
  }
}
